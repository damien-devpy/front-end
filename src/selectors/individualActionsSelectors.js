export const selectTakenIndividualActionsForParticipantAndYear = (
  individualActionCards,
  participantId,
  year
) =>
  filterIndividualActionsForParticipantAndYear(
    individualActionCards,
    participantId,
    year
  );

export const selectAvailableIndividualActionsForParticipantAndYear = (
  individualActionCards,
  participantId,
  year
) =>
  filterIndividualActionsForParticipantAndYear(
    individualActionCards,
    participantId,
    year,
    true
  );
const filterIndividualActionsForParticipantAndYear = (
  individualActionCards,
  participantId,
  year,
  includeAvailableActions = false
) => {
  const individualParticipantActions =
    individualActionCards.byParticipantIds[participantId];
  if (!individualParticipantActions) return {};
  const individualActionsForParticipantAndYearKeys = Object.keys(
    individualParticipantActions
  ).filter(
    (actionCardId) =>
      individualParticipantActions[actionCardId] === year ||
      (includeAvailableActions &&
        individualParticipantActions[actionCardId] === 0)
  );
  const individualActionsForParticipantAndYear = individualActionsForParticipantAndYearKeys.reduce(
    (accumulator, key) => {
      return { ...accumulator, [key]: individualParticipantActions[key] };
    },
    {}
  );
  return individualActionsForParticipantAndYear;
};
