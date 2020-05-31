import {
  AUTHENTICATE_CURRENT_USER,
  CURRENT_USER_LOAD_ERROR,
  CURRENT_USER_RETRIEVED,
  LOGOUT_CURRENT_USER,
} from '../actions/user';

const initialState = {
  isLoading: true,
  loadError: false,
  loadErrorDetails: null,
  signedIn: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_CURRENT_USER: {
      return {
        ...initialState,
      };
    }
    case LOGOUT_CURRENT_USER: {
      return {
        isLoading: false,
        loadError: false,
        loadErrorDetails: null,
        signedIn: false,
        user: {},
      };
    }
    case CURRENT_USER_RETRIEVED: {
      const { user } = action.payload;
      return {
        isLoading: false,
        loadErrorDetails: null,
        signedIn: true,
        user,
      };
    }
    case CURRENT_USER_LOAD_ERROR: {
      return {
        isLoading: false,
        loadError: true,
        loadErrorDetails: action.payload,
      };
    }
    default:
      return state;
  }
};
