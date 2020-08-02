import { changePassword } from '../utils/api';
import { logout } from '../utils/auth';

export const AUTHENTICATE_CURRENT_USER = 'AUTHENTICATE_CURRENT_USER';
export const CURRENT_USER_RETRIEVED = 'CURRENT_USER_RETRIEVED';
export const CURRENT_USER_LOAD_ERROR = 'CURRENT_USER_LOAD_ERROR';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const CHANGE_PASSWORD_CURRENT_USER = 'CHANGE_PASSWORD_CURRENT_USER';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';

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

export const logoutCurrentUser = () => {
  logout();
  return {
    type: LOGOUT_CURRENT_USER,
    payload: {},
  };
};

const requestChangePassword = () => ({
  type: CHANGE_PASSWORD_CURRENT_USER,
  payload: {},
});

const passwordChanged = () => ({
  type: PASSWORD_CHANGED,
  payload: {},
});

export const changeCurrentUserPassword = (password) => {
  return (dispatch) => {
    dispatch(requestChangePassword());
    return changePassword({ password }).then(() => {
      dispatch(logoutCurrentUser());
      dispatch(passwordChanged());
    });
  };
};
