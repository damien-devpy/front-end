const getActionCardsIdsByType = (actionCardsEntity, type) =>
  (actionCardsEntity &&
    Object.keys(actionCardsEntity).filter(
      (actionCardId) => actionCardsEntity[actionCardId].type === type
    )) ||
  [];

// eslint-disable-next-line import/prefer-default-export
export const generateDefautActionCardBatchesEntity = (actionCardsEntity) => {
  return {
    1: {
      id: 1,
      name: 'Lot individuel par défaut',
      type: 'individual',
      actionCardIds: getActionCardsIdsByType(actionCardsEntity, 'individual'),
    },
    2: {
      id: 2,
      name: 'Lot collectif par défaut',
      type: 'collective',
      actionCardIds: getActionCardsIdsByType(actionCardsEntity, 'collective'),
    },
  };
};
