import {
  selectIndividualActionsFromBatch,
  selectIndividualActionsGroupedByBatch,
} from './actionsSelector';

describe('Workshop selectors', () => {
  const action1 = {
    1: {
      name: 'SE DEPLACER A PIEDS OU A VÉLO',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batch: 'I1',
    },
  };
  const action2 = {
    2: {
      name: 'FAIRE PLUS DE COVOITURAGE',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batch: 'I1',
    },
  };
  const action3 = {
    3: {
      name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 3,
      batch: 'I2',
    },
  };
  const action4 = {
    4: {
      name: "FAIRE DE L'ECO-CONDUITE",
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batch: 'I3',
    },
  };
  const action5 = {
    4: {
      name: 'azerty',
      type: 'collective',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      batch: 'I3',
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
  describe('Select individual actions from batches', () => {
    it('should return only individual actions belonging to batch I1', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.actions,
        'I1'
      );
      expect(actionsFromBatch).toEqual({
        ...action1,
        ...action2,
      });
      done();
    });
    it('should return only individual actions belonging to batch I2', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.actions,
        'I2'
      );
      expect(actionsFromBatch).toEqual({
        ...action3,
      });
      done();
    });
    it('should return no individual action for a unknown batch', (done) => {
      const actionsFromBatch = selectIndividualActionsFromBatch(
        initState.actions,
        'I10'
      );
      expect(actionsFromBatch).toEqual({});
      done();
    });
    it('should return individual actions grouped by batch', (done) => {
      const actionsGroupedByBatch = selectIndividualActionsGroupedByBatch(
        initState.actions
      );
      expect(actionsGroupedByBatch).toEqual({
        I1: {
          ...action1,
          ...action2,
        },
        I2: {
          ...action3,
        },
        I3: {
          ...action4,
        },
      });
      done();
    });
  });
});
