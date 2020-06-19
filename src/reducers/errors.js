import { ERROR, RESET_ERROR_MESSAGE } from '../actions/errors';

const initialState = { msg: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_ERROR_MESSAGE: {
      return { msg: '' };
    }
    case ERROR: {
      const { error } = action.payload;
      return { msg: error };
    }
    default: {
      return state;
    }
  }
};
