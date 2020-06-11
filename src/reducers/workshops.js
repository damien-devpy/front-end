import { v4 as uuid } from 'uuid';

import {
  ADD_WORKSHOP,
  DELETE_WORKSHOP,
  RETRIEVE_WORKSHOPS,
  WORKSHOPS_LOAD_ERROR,
  WORKSHOPS_RETRIEVED,
} from '../actions/workshops';

const initialState = {
  isLoading: false,
  loaded: false,
  loadError: false,
  workshops: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKSHOP: {
      const { workshop } = action.payload;
      workshop.userId = uuid();
      return {
        ...state,
        workshops: [...state.workshops, workshop],
      };
    }
    case RETRIEVE_WORKSHOPS: {
      return {
        isLoading: true,
        loaded: false,

        loadErrorDetails: null,
      };
    }
    case WORKSHOPS_RETRIEVED: {
      const { workshops } = action.payload;
      return {
        isLoading: false,
        loaded: true,

        loadErrorDetails: null,
        workshops,
      };
    }
    case WORKSHOPS_LOAD_ERROR: {
      return {
        isLoading: false,
        loaded: false,
        loadError: true,
        loadErrorDetails: action.payload,
      };
    }
    case DELETE_WORKSHOP: {
      const { workshopId } = action.payload;
      console.log('Delete workshop', workshopId);
      return {
        ...state,
        workshops: [
          ...state.workshops.filter((workshop) => workshop.id !== workshopId),
        ],
      };
    }
    default:
      return state;
  }
};
