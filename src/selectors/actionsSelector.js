const selectActionsByTypeFromBatch = (
  actionCards,
  actionCardBatches,
  type,
  batchName
) => {
  if (!actionCards || !actionCardBatches) return {};
  const actionCardBatchId = Object.keys(actionCardBatches)
    .filter((id) => actionCardBatches[id].type === type)
    .find((id) => actionCardBatches[id].name === batchName);
  if (!actionCardBatchId) return {};
  return actionCardBatches[actionCardBatchId].actionCardIds.reduce(
    (accumulator, actionCardId) => ({
      ...accumulator,
      [actionCardId]: actionCards[actionCardId],
    }),
    {}
  );
};

export const selectIndividualActionsFromBatch = (
  actionCards,
  actionCardBatches,
  batchName
) =>
  selectActionsByTypeFromBatch(
    actionCards,
    actionCardBatches,
    'individual',
    batchName
  );

export const selectCollectiveActionsFromBatch = (
  actionCards,
  actionCardBatches,
  batchName
) =>
  selectActionsByTypeFromBatch(
    actionCards,
    actionCardBatches,
    'collective',
    batchName
  );

const selectBatchesByType = (actionCardBatches, type) =>
  Object.keys(actionCardBatches)
    .filter((id) => actionCardBatches[id].type === type)
    .reduce(
      (accumulator, actionCardBatchId) => ({
        ...accumulator,
        [actionCardBatchId]: actionCardBatches[actionCardBatchId],
      }),
      {}
    );

export const selectIndividualBatches = (actionCardBatches) =>
  selectBatchesByType(actionCardBatches, 'individual');

export const selectCollectiveBatches = (actionCardBatches) =>
  selectBatchesByType(actionCardBatches, 'collective');
