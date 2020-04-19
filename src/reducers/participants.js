import { useTranslation } from 'react-i18next';

import {
  INIT_PARTICIPANTS,
  SET_PARTICIPANT_NAME,
  SET_PARTICIPANT_EMAIL,
  ADD_PARTICIPANT,
} from '../actions/participants';

//const { t } = useTranslation();

const initialState = {
  byId: {
    1: {
      firstName: 'François',
      lastName: 'Laugier',
      email: 'francois_laugier@outlook.com',
      // status: t('manageParticipants.waiting'),
    },
    2: {
      firstName: 'Xavier',
      lastName: 'Arques',
      email: 'xavarques@gmail.com',
      // status: t('manageParticipants.ready'),
    }
  },
  allIds: [1, 2]
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case INIT_PARTICIPANTS: {
      const { participants } = action.payload;

      return {
        byId: participants
      };
    }

    case SET_PARTICIPANT_NAME: {
      const { participantId, firstLastName } = action.payload;

      console.log("Action set participant", participantId, firstLastName)
      const [firstName, lastName] = firstLastName.split(/ /);

      const newState = {
        ...state,
        byId: {
          ...state.byId,
          [participantId]: {
            ...state.byId[participantId],
            firstName: firstName,
            lastName: lastName,            
          }
        }
      };
      return newState;
    }

    case SET_PARTICIPANT_EMAIL: {
      const { participantId, email } = action.payload;

      console.log("Action set participant email", participantId)
      
      const newState = {
        ...state,
        byId: {
          ...state.byId,
          [participantId]: {
            ...state.byId[participantId],
            email: email           
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
            // status: t('manageParticipants.missing')
          }
        }
      };
      return newState;
    }
    default:
      return state;
  }
};

