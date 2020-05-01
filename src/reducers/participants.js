
import {
  SET_PARTICIPANT_NAME_EMAIL,
  ADD_PARTICIPANT,
  RETRIEVE_PARTICIPANTS,
  PARTICIPANTS_RETRIEVED,
  PARTICIPANTS_LOAD_ERROR
} from '../actions/participants';

export const MISSING_INFO = 'MISSING_INFO';
export const MUST_SEND_EMAIL = 'MUST_SEND_EMAIL';
export const EMAIL_SENT = 'EMAIL_SENT';
export const BILAN_RECEIVED = 'BILAN_RECEIVED';

const initialState = {
  isLoading: false,
  loadError: false,
  participants: null,
};

// todo add SET_STATUS 

export default (state = initialState, action) => {

  switch (action.type) {

    case RETRIEVE_PARTICIPANTS: {
      return {
        isLoading: true,
        loadErrorDetails: null
      };
    }

    case PARTICIPANTS_RETRIEVED: {
      const { participants } = action.payload;
      console.log("Reducer", action.payload)
      return {
        isLoading: false,
        loadErrorDetails: null,
        participants
      };
    }

    case PARTICIPANTS_LOAD_ERROR: {
      return {
        isLoading: false,
        loadError: true,
        loadErrorDetails: action.payload
      };
    }

    case SET_PARTICIPANT_NAME_EMAIL: {
      const { participantId, name, email, valid } = action.payload;

      console.log("Action set participant", participantId, name, email, valid)
      // todo this should be handled correctly when there are > 1 spaces
      const [firstName, lastName] = name.split(/ /);

      const newState = {
        ...state,
        participants: {
          ...state.participants,
          byId: {
            ...state.participants.byId,
            [participantId]: {
              ...state.participants.byId[participantId],
              firstName: firstName,
              lastName: lastName,
              email: email,
              isValid: valid,
              status:
                state.participants.byId[participantId].status === MISSING_INFO && valid ?
                  MUST_SEND_EMAIL : state.participants.byId[participantId].status
            }
          }
        }
      };
      return newState;
    }

    case ADD_PARTICIPANT: {

      console.log("Action ADD participant")
      const newId = state.participants.allIds.length + 1
      const newIds = Object.assign([], state.participants.allIds)
      newIds.push(newId)

      const participants = {
        allIds: newIds,
        byId: {
          ...state.participants.byId,
          [newId]: {
            firstName: "",
            lastName: "",
            email: "",
            status: MISSING_INFO,
            isValid: false,
            linkBC: null,
          }
        }
      };
      return { ...state, participants };
    }
    default:
      return state;
  }
};

