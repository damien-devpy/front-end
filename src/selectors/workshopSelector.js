import { makeYearParticipantKey, sumArray } from '../utils/helpers';

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
  individualChoicesEntity,
  round,
  participantId
) => {
  if (!individualChoicesEntity) return 0;
  const participantChoicesId = makeYearParticipantKey(round, participantId);
  return individualChoicesEntity[participantChoicesId] &&
    individualChoicesEntity[participantChoicesId].actionCardIds
    ? individualChoicesEntity[participantChoicesId].actionCardIds.length
    : 0;
};

export const getNumberOfChosenCollectiveCards = (
  collectiveChoicesEntity,
  round,  
) => {
  return collectiveChoicesEntity &&
      collectiveChoicesEntity[round] &&
      collectiveChoicesEntity[round].actionCardIds
    ? collectiveChoicesEntity[round].actionCardIds.length
    : 0;
};

export const getCostOfChosenActionCards = (
  individualChoicesEntity,
  actionCardsEntity,
  round,
  participantId
) => {
  if (!individualChoicesEntity) return 0;
  const id = makeYearParticipantKey(round, participantId);
  return actionCardsEntity &&
    individualChoicesEntity[id] &&
    individualChoicesEntity[id].actionCardIds
    ? sumArray(
        individualChoicesEntity[id].actionCardIds.map(
          (cardId) => actionCardsEntity[cardId].cost
        )
      )
    : 0;
};

export const getCostOfChosenCollectiveCards = (
  collectiveChoicesEntity,
  actionCardsEntity,
  round
) => {
  if (!collectiveChoicesEntity) return 0;
  return actionCardsEntity &&
    collectiveChoicesEntity[round] &&
    collectiveChoicesEntity[round].actionCardIds
    ? sumArray(
        collectiveChoicesEntity[round].actionCardIds.map(
          (cardId) => actionCardsEntity[cardId].cost
        )
      )
    : 0;
};

// computes number of hearts = budget per participant at the beginning of each round
export const getInitRoundBudget = (
  roundsConfigEntity,
  inidividualChoicesEntity,
  participantIds,
  actionCardsEntity
) => {
  const rounds = Object.keys(roundsConfigEntity);
  const individualRounds = rounds.filter(
    (round) => roundsConfigEntity[round].actionCardType === 'individual'
  );
  const roundBudgets = individualRounds.map(
    (round) => roundsConfigEntity[round].budget
  );
  const totalBudget = sumArray(roundBudgets);
  const initBudgets = {};
  participantIds.forEach((id) => {
    initBudgets[id] = totalBudget;
  });
  rounds.forEach((round) => {
    participantIds.forEach((id) => {
      const cardIds = inidividualChoicesEntity
        ? inidividualChoicesEntity[makeYearParticipantKey(round, id)]
        : null;
      cardIds &&
        cardIds.actionCardIds.forEach((cardId) => {
          initBudgets[id] -= actionCardsEntity[cardId].cost;
        });
    });
  });
  return initBudgets;
};

export const getInitRoundBudgetCollective = (
  roundsConfigEntity,
  collectiveChoicesEntity,
  actionCardsEntity
) => {
  const rounds = Object.keys(roundsConfigEntity);
  const collectiveRounds = rounds.filter(
    (round) => roundsConfigEntity[round].actionCardType === 'collective'
  );
  const roundBudgets = collectiveRounds
    ? collectiveRounds.map((round) => roundsConfigEntity[round].budget)
    : [0];
  let totalBudget = sumArray(roundBudgets);
  rounds.forEach((round) => {
    const cardIds = collectiveChoicesEntity
      ? collectiveChoicesEntity[round]
      : null;
    cardIds &&
      cardIds.actionCardIds.forEach((cardId) => {
        totalBudget -= actionCardsEntity[cardId].cost;
      });
  });
  return totalBudget;
};
