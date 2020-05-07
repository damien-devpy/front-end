export const selectIndividualActionsFromParticipant = (
  participantId,
  roundsConfigEntity,
  individualActionsEntity
) => [
  ...new Set(
    Object.keys(roundsConfigEntity).reduce(
      (accumulator, year) =>
        roundsConfigEntity[year].actionType === 'individual' &&
        individualActionsEntity[`${year}-${participantId}`]
          ? accumulator.concat(
              individualActionsEntity[`${year}-${participantId}`].actionIds
            )
          : accumulator,
      []
    )
  ),
];
