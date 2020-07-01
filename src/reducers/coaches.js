import {
  ADD_COACH,
  COACHES_LOAD_ERROR,
  COACHES_RETRIEVED,
  DELETE_COACH,
  RETRIEVE_COACHES,
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
    case DELETE_COACH: {
      const { coachId } = action.payload;
      return {
        ...state,
        coaches: state.coaches.filter((coach) => coach.id !== coachId),
      };
    }
    default:
      return state;
  }
};
