
import {
  SET_PARTICIPANT_NAME_EMAIL,
  ADD_PARTICIPANT,
  RETRIEVE_PARTICIPANTS,
  PARTICIPANTS_RETRIEVED,
  PARTICIPANTS_LOAD_ERROR,
  DELETE_PARTICIPANT,
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

function computeStatus(valid, participant, newPersona) {
  let newStatus = null;
  if (!valid) {
    newStatus = MISSING_INFO;
  } else if (newPersona) {
    newStatus = BILAN_RECEIVED;
  } else {
    switch (participant.status) { // old status
      case MISSING_INFO: {
        newStatus = MUST_SEND_EMAIL;
        break;
      }
      default: {
        if (participant.bilanCarbone) {
          newStatus = BILAN_RECEIVED;
        } else if (participant.linkBC) {
          newStatus = EMAIL_SENT;
        } else {
          newStatus = MUST_SEND_EMAIL;
        }
      }
    }
  }
  return newStatus;
}

// todo add SET_STATUS

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_PARTICIPANTS: {
      return {
        isLoading: true,
        loadErrorDetails: null,
      };
    }

    case PARTICIPANTS_RETRIEVED: {
      const { participants } = action.payload;
      console.log('Reducer', action.payload);
      return {
        isLoading: false,
        loadErrorDetails: null,
        participants,
      };
    }

    case PARTICIPANTS_LOAD_ERROR: {
      return {
        isLoading: false,
        loadError: true,
        loadErrorDetails: action.payload,
      };
    }

    case SET_PARTICIPANT_NAME_EMAIL: {
      const {
        participantId, name, email, persona, valid,
      } = action.payload;

      console.log('Action set participant', participantId, name, email, persona, valid);
      let [firstName, ...lastName] = name.split(/ /);
      lastName = lastName.join(' ');

      const newPersona = persona || null;
      const newStatus = computeStatus(valid, state.participants.byId[participantId], newPersona);

      const newState = {
        ...state,
        participants: {
          ...state.participants,
          byId: {
            ...state.participants.byId,
            [participantId]: {
              ...state.participants.byId[participantId],
              firstName,
              lastName,
              email,
              isValid: valid,
              personaId: newPersona,
              status: newStatus,
            },
          },
        },
      };
      return newState;
    }

    case ADD_PARTICIPANT: {
      console.log('Action ADD participant');
      const newId = state.participants.allIds.length + 1;
      const newIds = Object.assign([], state.participants.allIds);
      newIds.push(newId);

      const participants = {
        allIds: newIds,
        byId: {
          ...state.participants.byId,
          [newId]: {
            firstName: '',
            lastName: '',
            email: '',
            status: MISSING_INFO,
            isValid: false,
            linkBC: null,
            bilanCarbone: null,
          },
        },
      };
      return { ...state, participants };
    }

    case DELETE_PARTICIPANT: {
      console.log('Action DELETE participant');
      const { id } = action.payload;
      return {
        ...state,
        participants: {
          ...state.participants,
          // this should be enough to remove participants, without removing any entries
          allIds: state.participants.allIds.filter((i) => i !== id),
        },
      };
    }

    default:
      return state;
  }
};


