import handleFetch from './handleFetch';

export const getCoaches = () =>
  handleFetch(`/coaches`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });
