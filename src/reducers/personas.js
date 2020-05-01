
import {
    RETRIEVE_PERSONAS,
    PERSONAS_RETRIEVED,
    PERSONAS_LOAD_ERROR
} from "../actions/personas";

const initialState = {
    isLoading: false,
    loadError: false,
    personas: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_PERSONAS: {
            return {
                isLoading: true,
                loadErrorDetails: null
            };
        }
        case PERSONAS_RETRIEVED: {
            const { personas } = action.payload;
            return {
                isLoading: false,
                loadErrorDetails: null,
                personas
            };
        }
        case PERSONAS_LOAD_ERROR: {
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
