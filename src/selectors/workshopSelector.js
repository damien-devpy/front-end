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

export const selectCheckedActionCardsBatchesFromRounds = (roundsConfigEntity) =>
  Object.keys(roundsConfigEntity).reduce(
    (accumulator, roundConfigId) =>
      roundsConfigEntity[roundConfigId].actionCardBatchIds
        ? accumulator.concat(
            roundsConfigEntity[roundConfigId].actionCardBatchIds
          )
        : accumulator,
    []
  );

export const selectNextRound = (workshop) => {
  const config = workshop.entities.roundsConfig[workshop.result.currentYear];
  return config ? config.targetedYear : null;
};

export const selectIndividualRoundIds = (roundsConfig) =>
  Object.keys(roundsConfig).filter(
    (roundConfigId) =>
      roundsConfig[roundConfigId].actionCardType === 'individual'
  );

export const selectCollectiveRoundIds = (roundsConfig) =>
  Object.keys(roundsConfig).filter(
    (roundConfigId) =>
      roundsConfig[roundConfigId].actionCardType === 'collective'
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
