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

const assertIndividualActionsTakenByAParticipantOnASpecificYearAreUpdatedIntoTheStore = (
  store,
  params
) => expected => done => {
  onStoreChange(store)(() => {
    // console.log(
    //   'assertActionsEqualStoreChange',
    //   JSON.stringify(store.getState())
    // );
    expect(
      store.getState().individualActions.byIds[params.participantId][
        params.year
      ]
    ).toEqual(expected);
  })(done);
};

const assertAllIndividualActionsAreUpdatedIntoTheStore = store => expected => done => {
  onStoreChange(store)(() => {
    expect(store.getState().individualActions.byIds).toEqual(expected);
  })(done);
};

export function dispatchAction(store) {
  return action => store.dispatch(action);
}

describe('Individual Actions', () => {
  describe('Individual Actions Initialization', () => {
    it('should initialize every action with year 0', done => {
      // const initState = {
      //   individualActions: {
      //     byIds: {},
      //     allIds: []
      //   }
      // };
      const store = createStore(
        reducers,
        /*initState,*/ applyMiddleware(thunk)
      );
      console.log('store actions ', store.getState().actions);
      console.log('store participants ', store.getState().participants);
      dispatchAction(store)(
        initActions(
          store.getState().actions.byIds,
          store.getState().participants.byIds
        )
      );
    });
  });
  describe('Individual actions are registered for a specific year', () => {
    it('should registered the individual actions', done => {
      const initState = {
        individualActions: {
          byIds: {},
          allIds: []
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = [1, 2];
      assertIndividualActionsTakenByAParticipantOnASpecificYearAreUpdatedIntoTheStore(
        store,
        {
          participantId: '1',
          year: '2020'
        }
      )(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [1, 2]));
    });

    it('should registered new individual actions of a participant for a different year', done => {
      const initState = {
        individualActions: {
          byIds: { '1': { '2020': [1, 2] } },
          allIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = [3, 4];
      assertIndividualActionsTakenByAParticipantOnASpecificYearAreUpdatedIntoTheStore(
        store,
        {
          participantId: '1',
          year: '2023'
        }
      )(expected)(done);
      dispatchAction(store)(setActions(1, 2023, [3, 4]));
    });

    it('should NOT registered twice existing individual actions of a participant', done => {
      const initState = {
        individualActions: {
          byIds: {},
          allIds: []
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = [1];
      assertIndividualActionsTakenByAParticipantOnASpecificYearAreUpdatedIntoTheStore(
        store,
        {
          participantId: '1',
          year: '2020'
        }
      )(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [1, 1]));
    });

    it('should NOT registered twice existing individual actions of a participant for the same year', done => {
      const initState = {
        individualActions: {
          byIds: { '1': { '2020': [1, 2] } },
          allIds: [1]
        }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = [1, 2];
      assertIndividualActionsTakenByAParticipantOnASpecificYearAreUpdatedIntoTheStore(
        store,
        {
          participantId: '1',
          year: '2020'
        }
      )(expected)(done);
      dispatchAction(store)(setActions(1, 2020, [2]));
    });

    it('should registered individual actions for a different participant', done => {
      const initState = {
        individualActions: { byIds: { 1: { 2020: [1, 2, 3, 4] } }, allIds: [1] }
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        1: { 2020: [1, 2, 3, 4] },
        2: { 2020: [1, 3] }
      };
      assertAllIndividualActionsAreUpdatedIntoTheStore(store, {
        individualActions: {
          byIds: { 1: { 2020: [1, 2, 3, 4] }, 2: { 2020: [1, 3] } },
          allIds: [1, 2]
        }
      })(expected)(done);
      dispatchAction(store)(setActions(2, 2020, [1, 3]));
    });
  });
});
