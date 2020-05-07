import {
  selectIndividualActionsFromBatch,
  selectCollectiveActionsFromBatch,
  selectIndividualBatches,
  selectCollectiveBatches,
} from './actionsSelector';

describe('Workshop selectors', () => {
  const actionCard1 = {
    1: {
      name: 'SE DEPLACER A PIEDS OU A VÉLO',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
    },
  };
  const actionCard2 = {
    2: {
      name: 'FAIRE PLUS DE COVOITURAGE',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
    },
  };
  const actionCard3 = {
    3: {
      name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 3,
    },
  };
  const actionCard4 = {
    4: {
      name: "FAIRE DE L'ECO-CONDUITE",
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
    },
  };
  const actionCard5 = {
    5: {
      name: 'azerty',
      type: 'collective',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
    },
  };

  const actionCardBatch1 = {
    1: {
      id: 1,
      name: 'Ind1',
      type: 'individual',
      actionCardIds: [1, 2],
    },
  };
  const actionCardBatch2 = {
    2: {
      id: 2,
      name: 'Ind2',
      type: 'individual',
      actionCardIds: [3, 4],
    },
  };
  const actionCardBatch3 = {
    3: {
      id: 3,
      name: 'Col1',
      type: 'collective',
      actionCardIds: [5],
    },
  };
  const initState = {
    entities: {
      actionCards: {
        ...actionCard1,
        ...actionCard2,
        ...actionCard3,
        ...actionCard4,
        ...actionCard5,
      },
      actionCardBatches: {
        ...actionCardBatch1,
        ...actionCardBatch2,
        ...actionCardBatch3,
      },
    },
    result: { model: { actionCardBatches: [1, 2, 3] } },
  };
  describe('Select individual actions from batches', () => {
    it('should return only individual actions belonging to batch Ind1', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.entities.actionCards,
        initState.entities.actionCardBatches,
        'Ind1'
      );
      expect(actionsFromBatch).toEqual({
        ...actionCard1,
        ...actionCard2,
      });
      done();
    });
    it('should return only individual actions belonging to batch Ind2', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.entities.actionCards,
        initState.entities.actionCardBatches,
        'Ind2'
      );
      expect(actionsFromBatch).toEqual({
        ...actionCard3,
        ...actionCard4,
      });
      done();
    });
    it('should return no individual action for a unknown batch', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.entities.actionCards,
        initState.entities.actionCardBatches,
        'Ind10'
      );
      expect(actionsFromBatch).toEqual({});
      done();
    });
    it('should return individual batches', (done) => {
      const individualBatches = selectIndividualBatches(
        initState.entities.actionCardBatches
      );
      expect(individualBatches).toEqual({
        ...actionCardBatch1,
        ...actionCardBatch2,
      });
      done();
    });
    it('should return collective batches', (done) => {
      const collectiveBatches = selectCollectiveBatches(
        initState.entities.actionCardBatches
      );
      expect(collectiveBatches).toEqual({
        ...actionCardBatch3,
      });
      done();
    });
  });
  describe('Select collective actions from batches', () => {
    it('should return only collective actions belonging to batch Col1', (done) => {
      const actionsFromBatch = selectCollectiveActionsFromBatch(
        initState.entities.actionCards,
        initState.entities.actionCardBatches,
        'Col1'
      );
      expect(actionsFromBatch).toEqual({
        ...actionCard5,
      });
      done();
    });
  });
});
