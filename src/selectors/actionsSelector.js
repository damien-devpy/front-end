import { selectActionCardBatchesEntity } from './workshopSelector';

const selectBatchesByType = (state, type) => {
  const actionCardBatches = selectActionCardBatchesEntity(state);
  return (
    (actionCardBatches &&
      Object.keys(actionCardBatches)
        .filter((id) => actionCardBatches[id].type === type)
        .reduce(
          (accumulator, actionCardBatchId) => ({
            ...accumulator,
            [actionCardBatchId]: actionCardBatches[actionCardBatchId],
          }),
          {}
        )) ||
    {}
  );
};

export const selectIndividualBatches = (state) =>
  selectBatchesByType(state, 'individual');

export const selectCollectiveBatches = (state) =>
  selectBatchesByType(state, 'collective');
