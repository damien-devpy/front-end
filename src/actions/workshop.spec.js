import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import {
  initWorkshop,
  initNextRound,
  setCollectiveActions,
  setIndividualActions,
} from './workshop';
import thunk from 'redux-thunk';

const onStoreChange = (store) => (expectationsFn) => (done) => {
  store.subscribe(() => {
    setTimeout(() => {
      expectationsFn();
      done();
    }, 1000);
  });
};

const assertAllCollectiveActionsAreUpdatedIntoTheStore = (store) => (
  expected
) => (done) => {
  onStoreChange(store)(() => {
    expect(store.getState().rounds).toEqual(expected.rounds);
  })(done);
};

export function dispatchAction(store) {
  return (action) => store.dispatch(action);
}

describe('Game', () => {
  describe('Game Initialization', () => {
    it('should initialize the rounds to a empty object  with only the first year', (done) => {
      const initState = {
        workshop: {
          rounds: {
            byYear: { 2020: { collectiveActionIds: [1, 2] }, 2023: {} },
            allYears: [2020, 2023],
          },
        },
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 0,
                participants: {},
              },
            },
            allYears: [2020],
          },
        },
      };
      assertAllCollectiveActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(initWorkshop(2020));
    });
  });
  describe('Next round initialization', () => {
    it('should initialize the next round to an empty object without changing the existing rounds', (done) => {
      const initState = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [1, 2],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [] } },
              },
            },
            allYears: [2020],
          },
        },
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [1, 2],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [] } },
              },
              2023: {
                collectiveActionIds: [],
                influenceScore: 0,
                participants: {},
              },
            },
            allYears: [2020, 2023],
          },
        },
      };
      assertAllCollectiveActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(initNextRound(2023));
    });
  });
  describe('Collective actions', () => {
    it('should add collective actions to the specified year', (done) => {
      const initState = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [] } },
              },
            },
            allYears: [2020],
          },
        },
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [1, 2],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [] } },
              },
            },
            allYears: [2020],
          },
        },
      };
      assertAllCollectiveActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setCollectiveActions(2020, [1, 2]));
    });
  });
  describe('Individual actions', () => {
    it('should add individual actions to a participant for a specified year', (done) => {
      const initState = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [] } },
              },
            },
            allYears: [2020],
          },
        },
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 17,
                participants: { 1: { individualActionIds: [1, 2, 3] } },
              },
            },
            allYears: [2020],
          },
        },
      };
      assertAllCollectiveActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setIndividualActions(2020, 1, [1, 2, 3]));
    });
    it('should add individual actions to a participant for a specified year without changing actions of another particpant', (done) => {
      const initState = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 17,
                participants: {
                  1: { individualActionIds: [] },
                  2: { individualActionIds: [4, 5, 6, 7] },
                },
              },
            },
            allYears: [2020],
          },
        },
      };
      const store = createStore(reducers, initState, applyMiddleware(thunk));
      const expected = {
        workshop: {
          rounds: {
            byYear: {
              2020: {
                collectiveActionIds: [],
                influenceScore: 17,
                participants: {
                  1: { individualActionIds: [2, 3, 6] },
                  2: { individualActionIds: [4, 5, 6, 7] },
                },
              },
            },
            allYears: [2020],
          },
        },
      };
      assertAllCollectiveActionsAreUpdatedIntoTheStore(store)(expected)(done);
      dispatchAction(store)(setIndividualActions(2020, 1, [2, 3, 6]));
    });
  });
});
