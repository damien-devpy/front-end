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
              individualActionCardsEntity[`${year}-${participantId}`]
                ? accumulator.concat(
                    individualActionCardsEntity[`${year}-${participantId}`]
                      .actionCardIds
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
