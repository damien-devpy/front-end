export const AUTHENTICATE_CURRENT_USER = 'AUTHENTICATE_CURRENT_USER';
export const CURRENT_USER_RETRIEVED = 'CURRENT_USER_RETRIEVED';
export const RETRIEVE_CURRENT_USER = 'RETRIEVE_CURRENT_USER';
export const CURRENT_USER_LOAD_ERROR = 'CURRENT_USER_LOAD_ERROR';

export const currentUserRetrieved = (user) => ({
  type: CURRENT_USER_RETRIEVED,
  payload: { user },
});

export const retrieveCurrentUser = (credentials) => ({
  type: RETRIEVE_CURRENT_USER,
  payload: { credentials },
});

export const currentUserLoadError = (error) => ({
  type: CURRENT_USER_LOAD_ERROR,
  payload: error,
});

export const authenticateCurrentUser = () => ({
  type: AUTHENTICATE_CURRENT_USER,
  payload: {},
});
