export const selectActionsFromBatch = (actions, batchId) =>
  Object.keys(actions)
    .filter((actionId) => actions[actionId].batchId === batchId)
    .reduce(
      (accumulator, actionId) => ({
        ...accumulator,
        [actionId]: actions[actionId],
      }),
      {}
    );

export const selectActionsGroupedByBatch = (actions) =>
  Object.keys(actions).reduce(
    (accumulator, actionId) => ({
      ...accumulator,
      [actions[actionId].batchId]: {
        ...accumulator[actions[actionId].batchId],
        [actionId]: actions[actionId],
      },
    }),
    {}
  );
