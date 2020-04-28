import { selectActionsFromGroup } from './workshopSelector';

describe('Workshop selectors', () => {
  const action1 = {
    1: {
      name: 'SE DEPLACER A PIEDS OU A VÉLO',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      groupId: 1,
    },
  };
  const action2 = {
    2: {
      name: 'FAIRE PLUS DE COVOITURAGE',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      groupId: 1,
    },
  };
  const action3 = {
    3: {
      name: 'FAIRE PLUS DE TÉLÉTRAVAIL',
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 3,
      groupId: 2,
    },
  };
  const action4 = {
    4: {
      name: "FAIRE DE L'ECO-CONDUITE",
      type: 'individual',
      category: 'ECOGESTES',
      subCategory: 'TRANSPORT',
      cost: 4,
      groupId: 3,
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
  describe('Select actions from groups', () => {
    it('should return only actions belonging to group 1', (done) => {
      const actionsFromGroupOne = selectActionsFromGroup(initState.actions, 1);
      expect(actionsFromGroupOne).toEqual({
        ...action1,
        ...action2,
      });
      done();
    });
    it('should return only actions belonging to group 2', (done) => {
      const actionsFromGroupOne = selectActionsFromGroup(initState.actions, 2);
      expect(actionsFromGroupOne).toEqual({
        ...action3,
      });
      done();
    });
    it('should return no action for a unknown group', (done) => {
      const actionsFromGroupOne = selectActionsFromGroup(initState.actions, 10);
      expect(actionsFromGroupOne).toEqual({});
      done();
    });
  });
});
