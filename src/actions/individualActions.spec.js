import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { initActions, setActions } from './individualActions';
import thunk from 'redux-thunk';

const onStoreChange = store => expectationsFn => done => {
  store.subscribe(() => {
    setTimeout(() => {
      expectationsFn();
      done();
    }, 1000);
  });
};

const assertAllIndividualActionsAreUpdatedIntoTheStore = store => expected => done => {
  onStoreChange(store)(() => {
    expect(store.getState().individualActions).toEqual(
      expected.individualActions
    );
  })(done);
};

export function dispatchAction(store) {
  return action => store.dispatch(action);
}

describe('Individual Actions', () => {
  describe('Individual Actions Initialization', () => {
    it('should initialize every action with year 0', done => {
      const initState = {
        actions: {
          byId: {
            1: 'ACTION1',
            2: 'ACTION2'
          }
        },
        participants: {
          byId: {
            1: {},
            2: {}
          }
        },
        individualActions: {
          byParticipantIds: {},
          allParticipantIds: []
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      //console.log('store actions ', store.getState().actions);
      //console.log('store participants ', store.getState().participants);
      const expected = {
        individualActions: {
          byParticipantIds: { 1: { 1: 0, 2: 0 }, 2: { 1: 0, 2: 0 } },
          allParticipantIds: [1, 2]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(
        initActions(
          store.getState().actions.byId,
          store.getState().participants.byId
        )
      );
    });
  });
  describe('Individual actions are registered for a specific year', () => {
    it('should registered the individual actions', done => {
      const initState = {
        individualActions: {
          byParticipantIds: { 1: { 1: 0, 2: 0 } },
          allParticipantIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020, 2: 2020 } },
          allParticipantIds: [1]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [1, 2]));
    });

    it('should registered new individual actions of a participant for a different year', done => {
      const initState = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020, 2: 2020, 3: 0, 4: 0 } },
          allParticipantIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020, 2: 2020, 3: 2023, 4: 2023 } },
          allParticipantIds: [1]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setActions(1, 2023, [3, 4]));
    });

    it('should NOT registered twice existing individual actions of a participant', done => {
      const initState = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020 } },
          allParticipantIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020 } },
          allParticipantIds: [1]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [1]));
    });

    it('should NOT registered twice existing individual actions of a participant for the same year', done => {
      const initState = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020, 2: 2020 } },
          allParticipantIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        individualActions: {
          byParticipantIds: { 1: { 1: 2020, 2: 2020 } },
          allParticipantIds: [1]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [2]));
    });

    it('should registered individual actions for a different participant', done => {
      const initState = {
        individualActions: {
          byParticipantIds: {
            1: { 1: 2020, 2: 2020, 3: 2020, 4: 2020 },
            2: { 1: 0, 2: 0, 3: 0, 4: 0 }
          },
          allParticipantIds: [1, 2]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        individualActions: {
          byParticipantIds: {
            1: { 1: 2020, 2: 2020, 3: 2020, 4: 2020 },
            2: { 1: 2020, 2: 0, 3: 2020, 4: 0 }
          },
          allParticipantIds: [1, 2]
        }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setActions(2, 2020, [1, 3]));
    });
  });
});
