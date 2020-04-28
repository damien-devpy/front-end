export const selectActionsFromGroup = (actions, groupId) => {
  return Object.keys(actions)
    .filter((actionId) => actions[actionId].groupId === groupId)
    .reduce(
      (accumulator, key) => ({ ...accumulator, [key]: actions[key] }),
      {}
    );
};
