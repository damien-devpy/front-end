export const AUTHENTICATE_CURRENT_USER = 'AUTHENTICATE_CURRENT_USER';
export const CURRENT_USER_RETRIEVED = 'CURRENT_USER_RETRIEVED';
export const CURRENT_USER_LOAD_ERROR = 'CURRENT_USER_LOAD_ERROR';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const currentUserRetrieved = (user) => ({
  type: CURRENT_USER_RETRIEVED,
  payload: { user },
});

export const currentUserLoadError = (error) => ({
  type: CURRENT_USER_LOAD_ERROR,
  payload: error,
});

export const authenticateCurrentUser = () => ({
  type: AUTHENTICATE_CURRENT_USER,
  payload: {},
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
  payload: {},
});
