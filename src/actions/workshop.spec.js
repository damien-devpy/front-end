import { createStore } from 'redux';

import reducers from '../reducers';
import { endWorkshop, initRound, startRound } from './workshop';

const onStoreChange = (store) => (expectationsFn) => (done) => {
  store.subscribe(() => {
    setTimeout(() => {
      expectationsFn();
      done();
    }, 1000);
  });
};

const assertStoreWasUpdatedWithExpectedData = (store) => (expected) => (
  done
) => {
  onStoreChange(store)(() => {
    expect(store.getState().workshop).toEqual(expected.workshop);
  })(done);
};

describe('Workshop', () => {
  describe('Init Round', () => {
    it('should initialize the round with the round number present in the payload', (done) => {
      const initState = {
        workshop: {
          isSynchronized: true,
          entities: { rounds: {} },
          result: { rounds: [] },
        },
      };
      const expected = {
        workshop: {
          isSynchronized: false,
          entities: {
            rounds: {
              2020: { year: 2020 },
            },
          },
          result: {
            rounds: [2020],
          },
        },
      };
      const store = createStore(reducers, initState);
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(initRound(2020));
    });
  });
  describe('Start Round', () => {
    it('should initialize the round with the payload', (done) => {
      const initState = {
        workshop: {
          entities: {
            rounds: {
              2020: { year: 2020 },
            },
          },
          result: {
            rounds: [2020],
          },
        },
      };
      const expected = {
        workshop: {
          entities: {
            roundConfig: {
              2020: {
                actionCardType: 'individual',
                targetedYear: 2023,
                individualBudget: 4,
                actionCardBatchIds: [1],
              },
            },
            rounds: {
              2020: { year: 2020, roundConfig: 2020 },
            },
          },
          result: {
            rounds: [2020],
          },
        },
      };
      const store = createStore(reducers, initState);
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(
        startRound({
          actionCardType: 'individual',
          currentYear: 2020,
          targetedYear: 2023,
          individualBudget: 4,
          actionCardBatchIds: [1],
        })
      );
    });
  });
  describe('End Workshop', () => {
    it('should set the workshop status to ended', (done) => {
      const initState = {
        workshop: {
          result: {
            status: 'ongoing',
          },
        },
      };
      const expected = {
        workshop: {
          result: {
            status: 'ended',
          },
        },
      };
      const store = createStore(reducers, initState);
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(endWorkshop());
    });
  });
});
