import { v4 as uuid } from "uuid";

import {
  ADD_WORKSHOP,
  RETRIEVE_WORKSHOPS,
  WORKSHOPS_RETRIEVED,
  WORKSHOPS_LOAD_ERROR
} from "../actions/workshops";

const initialState = {
  isLoading: false,
  loadError: false,
  workshops: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKSHOP: {
      const { workshop } = action.payload;
      workshop.userId = uuid();
      return {
        ...state,
        workshops: [...state.workshops, workshop]
      };
    }
    case RETRIEVE_WORKSHOPS: {
      return {
        isLoading: true,
        loadErrorDetails: null
      };
    }
    case WORKSHOPS_RETRIEVED: {
      const { workshops } = action.payload;
      return {
        isLoading: false,
        loadErrorDetails: null,
        workshops
      };
    }
    case WORKSHOPS_LOAD_ERROR: {
      return {
        isLoading: false,
        loadError: true,
        loadErrorDetails: action.payload
      };
    }
    default:
      return state;
  }
};
