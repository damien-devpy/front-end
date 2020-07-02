import { generateDefautActionCardBatchesEntity } from './actionCardBatchesGenerator';

describe('Generate default actionCardBatches', () => {
  test('Generate 2 objects: 1 with all individual cardIds, another with collective cardIds', () => {
    const actionCardsEntity = {
      1: {
        id: 1,
        type: 'individual',
      },
      2: {
        id: 2,
        type: 'collective',
      },
      3: {
        id: 3,
        type: 'individual',
      },
      4: {
        id: 4,
        type: 'collective',
      },
    };

    const expectedActionCardBatchesEntity = {
      1: {
        id: 1,
        name: 'Lot individuel par défaut',
        type: 'individual',
        actionCardIds: ['1', '3'],
      },
      2: {
        id: 2,
        name: 'Lot collectif par défaut',
        type: 'collective',
        actionCardIds: ['2', '4'],
      },
    };

    const generatedActionCardBatchesEntity = generateDefautActionCardBatchesEntity(
      actionCardsEntity
    );

    expect(generatedActionCardBatchesEntity).toEqual(
      expectedActionCardBatchesEntity
    );
  });
  test('Return empty object if actionCardsEntity is null', () => {
    const generatedActionCardBatchesEntity = generateDefautActionCardBatchesEntity(
      null
    );
    const expectedActionCardBatchesEntity = {
      1: {
        id: 1,
        name: 'Lot individuel par défaut',
        type: 'individual',
        actionCardIds: [],
      },
      2: {
        id: 2,
        name: 'Lot collectif par défaut',
        type: 'collective',
        actionCardIds: [],
      },
    };
    expect(generatedActionCardBatchesEntity).toEqual(
      expectedActionCardBatchesEntity
    );
  });
});
