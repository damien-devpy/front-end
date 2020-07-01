import { createStore } from 'redux';

import reducers from '../reducers';
import { addCoach, deleteCoach } from './coaches';

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
    expect(store.getState().coaches).toEqual(expected.coaches);
  })(done);
};

const coach1 = {
  id: '123456789',
  firstName: 'coach1',
  lastName: 'coach1',
  email: 'admin1@test.com',
  city: 'Paris',
  role: 'admin',
  workshopsCount: 0,
  awarenessRaisedCount: 0,
};
const coach2 = {
  id: '987654321',
  firstName: 'coach2',
  lastName: 'coach2',
  email: 'admin2@test.com',
  city: 'Paris',
  role: 'admin',
  workshopsCount: 5,
  awarenessRaisedCount: 3,
};
describe('Coach', () => {
  describe('Add coach', () => {
    it('should add a coach into the store when it is empty', (done) => {
      const initState = { coaches: { coaches: [] } };
      const store = createStore(reducers, initState);
      const expected = { coaches: { coaches: [coach1] } };
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(addCoach(coach1));
    });
    it('should add a coach into the store when it is not empty', (done) => {
      const initState = { coaches: { coaches: [coach1] } };
      const store = createStore(reducers, initState);
      const expected = { coaches: { coaches: [coach1, coach2] } };
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(addCoach(coach2));
    });
  });
  describe('Delete coach', () => {
    it('should delete a coach into the store containing one coach', (done) => {
      const initState = { coaches: { coaches: [coach1] } };
      const store = createStore(reducers, initState);
      const expected = { coaches: { coaches: [] } };
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(deleteCoach(coach1.id));
    });
    it('should delete a coach into the store containing two coaches', (done) => {
      const initState = { coaches: { coaches: [coach1, coach2] } };
      const store = createStore(reducers, initState);
      const expected = { coaches: { coaches: [coach1] } };
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(deleteCoach(coach2.id));
    });
    it("should not change the store content if the coachId doesn't exist", (done) => {
      const initState = { coaches: { coaches: [coach1] } };
      const store = createStore(reducers, initState);
      const expected = { coaches: { coaches: [coach1] } };
      assertStoreWasUpdatedWithExpectedData(store)(expected)(done);
      store.dispatch(deleteCoach(0));
    });
  });
});
