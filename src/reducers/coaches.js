import { v4 as uuid } from 'uuid';

import {
  ADD_COACH,
  COACHES_LOAD_ERROR,
  COACHES_RETRIEVED,
  RETRIEVE_COACHES,
  DELETE_COACH
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
      coach.id = uuid();
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
      console.log('COACHES_RETRIEVED', coaches);
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
    case DELETE_COACH: {
      const { coachId } = action.payload;
      console.log('Delete coach : ', coachId);
      return {
        ...state,
        coachess: [
          ...state.coaches.filter((coach) => coach.id !== coachId),
        ],
      };
    }
    default:
      return state;
  }
};
