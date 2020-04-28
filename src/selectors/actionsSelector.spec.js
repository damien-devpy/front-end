import { selectActionsFromBatch } from './actionsSelector';

describe('Workshop selectors', () => {
  const action1 = {
    1: {
      name: 'SE DEPLACER A PIEDS OU A VÉLO',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batchId: 1,
    },
  };
  const action2 = {
    2: {
      name: 'FAIRE PLUS DE COVOITURAGE',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batchId: 1,
    },
  };
  const action3 = {
    3: {
      name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 3,
      batchId: 2,
    },
  };
  const action4 = {
    4: {
      name: "FAIRE DE L'ECO-CONDUITE",
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batchId: 3,
    },
  };
  const initState = {
    actions: {
      ...action1,
      ...action2,
      ...action3,
      ...action4,
    },
  };
  describe('Select actions from batches', () => {
    it('should return only actions belonging to batch 1', (done) => {
      const actionsFromBatch = selectActionsFromBatch(initState.actions, 1);
      expect(actionsFromBatch).toEqual({
        ...action1,
        ...action2,
      });
      done();
    });
    it('should return only actions belonging to batch 2', (done) => {
      const actionsFromBatch = selectActionsFromBatch(initState.actions, 2);
      expect(actionsFromBatch).toEqual({
        ...action3,
      });
      done();
    });
    it('should return no action for a unknown batch', (done) => {
      const actionsFromBatch = selectActionsFromBatch(initState.actions, 10);
      expect(actionsFromBatch).toEqual({});
      done();
    });
  });
});
