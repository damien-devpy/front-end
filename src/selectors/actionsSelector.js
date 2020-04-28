export const selectActionsFromBatch = (actions, batchId) => {
  return Object.keys(actions)
    .filter((actionId) => actions[actionId].batchId === batchId)
    .reduce(
      (accumulator, key) => ({ ...accumulator, [key]: actions[key] }),
      {}
    );
};
