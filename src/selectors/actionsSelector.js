const selectActionsByTypeFromBatch = (actions, type, batch) =>
  Object.keys(actions)
    .filter(
      (actionId) =>
        actions[actionId].batch === batch && actions[actionId].type === type
    )
    .reduce(
      (accumulator, actionId) => ({
        ...accumulator,
        [actionId]: actions[actionId],
      }),
      {}
    );

export const selectIndividualActionsFromBatch = (actions, batch) =>
  selectActionsByTypeFromBatch(actions, 'individual', batch);

export const selectCollectiveActionsFromBatch = (actions, batch) =>
  selectActionsByTypeFromBatch(actions, 'collective', batch);

const selectActionsByTypeGroupedByBatch = (actions, type) =>
  Object.keys(actions)
    .filter((actionId) => actions[actionId].type === type)
    .reduce(
      (accumulator, actionId) => ({
        ...accumulator,
        [actions[actionId].batch]: {
          ...accumulator[actions[actionId].batch],
          [actionId]: actions[actionId],
        },
      }),
      {}
    );

export const selectIndividualActionsGroupedByBatch = (actions) =>
  selectActionsByTypeGroupedByBatch(actions, 'individual');

export const selectCollectiveActionsGroupedByBatch = (actions) =>
  selectActionsByTypeGroupedByBatch(actions, 'collective');
