import { v4 as uuid } from 'uuid';

import {
  ADD_COACH,
  RETRIEVE_COACHES,
  COACHES_RETRIEVED,
  COACHES_LOAD_ERROR,
} from '../actions/coaches';

const initialState = {
  isLoading: false,
  loadError: false,
  coaches: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COACH: {
      const { coach } = action.payload;
      console.log('ADD_COACH', action.payload);
      coach.userId = uuid();
      return {
        ...state,
        coaches: [...state.coaches, coach],
      };
    }
    case RETRIEVE_COACHES: {
      return {
        isLoading: true,
        loadErrorDetails: null,
      };
    }
    case COACHES_RETRIEVED: {
      const { coaches } = action.payload;
      return {
        isLoading: false,
        loadErrorDetails: null,
        coaches,
      };
    }
    case COACHES_LOAD_ERROR: {
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
