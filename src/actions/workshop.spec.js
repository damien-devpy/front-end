import { createStore } from 'redux';

import reducers from '../reducers';
import { endWorkshop } from './workshop';

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
