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
// export const selectIndividualActionsForParticipantAndYear2 = createSelector(
//   state => state.individualActions,
//   (_, participantId) => participantId,
//   (_, year) => year,
//   (individualActions, participantId, year) => {
//     console.log('selector  individualActions', individualActions);
//     console.log('selector participantId', participantId);
//     console.log('selector year', year);
//     const individualParticipantActions =
//       individualActions.byParticipantIds[participantId];
//     console.log('individualParticipantActions', individualParticipantActions);
//     const individualActionsForParticipantAndYearKeys = Object.keys(
//       individualParticipantActions
//     ).filter(actionId => {
//       console.log('actionId', actionId);
//       console.log('year', year);
//       console.log(
//         'individualParticipantActions[actionId]',
//         individualParticipantActions[actionId]
//       );
//       return individualParticipantActions[actionId] === year;
//     });
//     console.log(
//       'individualActionsForParticipantAndYearKeys',
//       individualActionsForParticipantAndYearKeys
//     );
//     const individualActionsForParticipantAndYear = individualActionsForParticipantAndYearKeys.reduce(
//       (accumulator, key) => {
//         return { ...accumulator, [key]: individualParticipantActions[key] };
//       },
//       {}
//     );
//     console.log(
//       'individualActionsForParticipantAndYear',
//       individualActionsForParticipantAndYear
//     );
//     return individualActionsForParticipantAndYear;
//   }
// );
