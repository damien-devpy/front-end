import { makeYearParticipantKey } from '../utils/helpers';

export const selectIndividualChoicesForParticipant = (
  participantId,
  roundsConfigEntity,
  individualChoicesEntity
) =>
  individualChoicesEntity
    ? [
        ...new Set(
          Object.keys(roundsConfigEntity).reduce(
            (accumulator, year) =>
              roundsConfigEntity[year].actionCardType === 'individual' &&
              individualChoicesEntity[
                makeYearParticipantKey(year, participantId)
              ]
                ? accumulator.concat(
                    individualChoicesEntity[
                      makeYearParticipantKey(year, participantId)
                    ].actionCardIds
                  )
                : accumulator,
            []
          )
        ),
      ]
    : [];

export const selectCollectiveChoices = (
  roundsConfigEntity,
  collectiveChoicesEntity
) =>
  collectiveChoicesEntity
    ? [
        ...new Set(
          Object.keys(roundsConfigEntity).reduce(
            (accumulator, year) =>
              roundsConfigEntity[year].actionCardType === 'collective' &&
              collectiveChoicesEntity[year]
                ? accumulator.concat(
                    collectiveChoicesEntity[year].actionCardIds
                  )
                : accumulator,
            []
          )
        ),
      ]
    : [];

export const selectCheckedActionCardsBatchesFromRounds = (
  roundsConfigEntity,
  actionCardType
) =>
  Object.keys(roundsConfigEntity).reduce(
    (accumulator, roundConfigId) =>
      roundsConfigEntity[roundConfigId].actionCardBatchIds &&
      (!actionCardType ||
        actionCardType === roundsConfigEntity[roundConfigId].actionCardType)
        ? accumulator.concat(
            roundsConfigEntity[roundConfigId].actionCardBatchIds
          )
        : accumulator,
    []
  );

export const selectCheckedIndividualActionCardsBatchesFromRounds = (
  roundsConfigEntity
) =>
  selectCheckedActionCardsBatchesFromRounds(roundsConfigEntity, 'individual');

export const selectCheckedCollectiveActionCardsBatchesFromRounds = (
  roundsConfigEntity
) =>
  selectCheckedActionCardsBatchesFromRounds(roundsConfigEntity, 'collective');

export const selectNextRound = (workshop) => {
  const config = workshop.entities.roundsConfig[workshop.result.currentYear];
  return config ? config.targetedYear : null;
};

export const selectIndividualRoundIds = (roundsConfigEntity) =>
  Object.keys(roundsConfigEntity).filter(
    (roundConfigId) =>
      roundsConfigEntity[roundConfigId].actionCardType === 'individual'
  );

export const selectCollectiveRoundIds = (roundsConfigEntity) =>
  Object.keys(roundsConfigEntity).filter(
    (roundConfigId) =>
      roundsConfigEntity[roundConfigId].actionCardType === 'collective'
  );

export const getNumberOfChosenActionCards = (
  individualChoices,
  round,
  participantId
) => {
  if (!individualChoices) return 0;
  const participantChoicesId = makeYearParticipantKey(round, participantId);
  return individualChoices[participantChoicesId] &&
    individualChoices[participantChoicesId].actionCardIds
    ? individualChoices[participantChoicesId].actionCardIds.length
    : 0;
};

export const getCostOfChosenActionCards = (
  individualChoices,
  actionCardsEntity,
  round,
  participantId
) => {
  if (!individualChoices) return 0;
  const id = makeYearParticipantKey(round, participantId);
  return actionCardsEntity &&
    individualChoices[id] &&
    individualChoices[id].actionCardIds
    ? individualChoices[id].actionCardIds
        .map((cardId) => actionCardsEntity[cardId].cost)
        .reduce((a, b) => a + b, 0)
    : 0;
};

// computes number of hearts = budget per participant at the beginning of each round
export const getInitRoundBudget = (
  roundsConfig,
  previousChoices,
  participantIds,
  actionCards
) => {
  const rounds = Object.keys(roundsConfig);
  const roundBudgets = rounds.map((round) => roundsConfig[round].budget);
  const totalBudget = roundBudgets.reduce((a, b) => a + b, 0);
  const initBudgets = {};
  participantIds.forEach((id) => {
    initBudgets[id] = totalBudget;
  });
  rounds.forEach((round) => {
    participantIds.forEach((id) => {
      const cardIds = previousChoices
        ? previousChoices[makeYearParticipantKey(round, id)]
        : null;
      cardIds &&
        cardIds.actionCardIds.forEach((cardId) => {
          initBudgets[id] -= actionCards[cardId].cost;
        });
    });
  });
  return initBudgets;
};
