export const selectTakenIndividualActionsForParticipantAndYear = (
  individualActions,
  participantId,
  year
) =>
  filterIndividualActionsForParticipantAndYear(
    individualActions,
    participantId,
    year
  );

export const selectAvailableIndividualActionsForParticipantAndYear = (
  individualActions,
  participantId,
  year
) =>
  filterIndividualActionsForParticipantAndYear(
    individualActions,
    participantId,
    year,
    true
  );
const filterIndividualActionsForParticipantAndYear = (
  individualActions,
  participantId,
  year,
  includeAvailableActions = false
) => {
  const individualParticipantActions =
    individualActions.byParticipantIds[participantId];
  if (!individualParticipantActions) return {};
  const individualActionsForParticipantAndYearKeys = Object.keys(
    individualParticipantActions
  ).filter(
    actionId =>
      individualParticipantActions[actionId] === year ||
      (includeAvailableActions && individualParticipantActions[actionId] === 0)
  );
  const individualActionsForParticipantAndYear = individualActionsForParticipantAndYearKeys.reduce(
    (accumulator, key) => {
      return { ...accumulator, [key]: individualParticipantActions[key] };
    },
    {}
  );
  return individualActionsForParticipantAndYear;
};
