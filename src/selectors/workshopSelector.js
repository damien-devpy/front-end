import { makeYearParticipantKey } from '../utils/helpers';

export const selectIndividualActionCardsFromParticipant = (
  participantId,
  roundsConfigEntity,
  individualActionCardsEntity
) =>
  individualActionCardsEntity
    ? [
        ...new Set(
          Object.keys(roundsConfigEntity).reduce(
            (accumulator, year) =>
              roundsConfigEntity[year].actionCardType === 'individual' &&
              individualActionCardsEntity[
                makeYearParticipantKey(year, participantId)
              ]
                ? accumulator.concat(
                    individualActionCardsEntity[
                      makeYearParticipantKey(year, participantId)
                    ].actionCardIds
                  )
                : accumulator,
            []
          )
        ),
      ]
    : [];

export const selectCollectiveActionCards = (
  roundsConfigEntity,
  collectiveActionCardsEntity
) =>
  collectiveActionCardsEntity
    ? [
        ...new Set(
          Object.keys(roundsConfigEntity).reduce(
            (accumulator, year) =>
              roundsConfigEntity[year].actionCardType === 'collective' &&
              collectiveActionCardsEntity[year]
                ? accumulator.concat(
                    collectiveActionCardsEntity[year].actionCardIds
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

export const getNumberOfTakenActionCards = (
  individualActionCardsEntity,
  round,
  participantId
) => {
  if (!individualActionCardsEntity) return 0;
  const individualActionCardsId = `${round}-${participantId}`;
  return individualActionCardsEntity[individualActionCardsId] &&
    individualActionCardsEntity[individualActionCardsId].actionCardIds
    ? individualActionCardsEntity[individualActionCardsId].actionCardIds.length
    : 0;
};

export const getCostOfTakenActionCards = (
  individualActionCards,
  actionCardsEntity,
  round,
  participantId
) => {
  if (!individualActionCards) return 0;
  const id = `${round}-${participantId}`;
  console.log('Action cards entity', actionCardsEntity);
  console.log(
    'Participant action Cards',
    individualActionCards[id] && individualActionCards[id].actionCardIds
  );
  return actionCardsEntity &&
    individualActionCards[id] &&
    individualActionCards[id].actionCardIds
    ? individualActionCards[id].actionCardIds
        .map((cardId) => actionCardsEntity[cardId].cost)
        .reduce((a, b) => a + b, 0)
    : 0;
};
