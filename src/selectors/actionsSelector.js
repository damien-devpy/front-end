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
