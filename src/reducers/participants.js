import { useTranslation } from 'react-i18next';

import {
  INIT_PARTICIPANTS,
  SET_PARTICIPANT_NAME_EMAIL,
  ADD_PARTICIPANT,
} from '../actions/participants';

const MISSING_INFO = 'MISSING_INFO';
const MUST_SEND_EMAIL = 'MUST_SEND_EMAIL';
const EMAIL_SENT = 'EMAIL_SENT';
const BILAN_RECEIVED = 'BILAN_RECEIVED';

//const { t } = useTranslation();

const initialState = {
  byId: {
    1: {
      firstName: 'François',
      lastName: 'Laugier',
      email: 'francois_laugier@outlook.com',
      status: MUST_SEND_EMAIL,
      isValid: true,
    },
    2: {
      firstName: 'Xavier',
      lastName: 'Arques',
      email: 'xavarques@gmail.com',
      status: BILAN_RECEIVED,
      isValid: true,
    }
  },
  allIds: [1, 2]
};

// todo add SET_STATUS 

export default (state = initialState, action) => {
  
  switch (action.type) {
    case INIT_PARTICIPANTS: {
      const { participants } = action.payload;

      return {
        byId: participants
      };
    }

    case SET_PARTICIPANT_NAME_EMAIL: {
      // todo pass directly first/last name?
      const { participantId, name, email, valid } = action.payload;

      console.log("Action set participant", participantId, name, email, valid)
      const [firstName, lastName] = name.split(/ /);

      const newState = {
        ...state,
        byId: {
          ...state.byId,
          [participantId]: {
            ...state.byId[participantId],
            firstName: firstName,
            lastName: lastName,  
            email: email,
            isValid: valid,   
            status: 
              state.byId[participantId].status === MISSING_INFO && valid ? 
              MUST_SEND_EMAIL : state.byId[participantId].status       
          }
        }
      };
      return newState;
    }

    case ADD_PARTICIPANT: {
      
      console.log("Action ADD participant")
      const newId = state.allIds.length + 1
      const newIds = Object.assign([], state.allIds)
      newIds.push(newId)
      
      const newState = {
        allIds: newIds,
        byId: {
          ...state.byId,
          [newId]: {
            firstName: "",
            lastName: "",            
            email: "",
            status: MISSING_INFO,
            isValid: false,
          }
        }
      };
      return newState;
    }
    default:
      return state;
  }
};

