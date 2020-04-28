export const INIT_PARTICIPANTS = 'INIT_PARTICIPANTS';
export const SET_PARTICIPANT_NAME_EMAIL = 'SET_PARTICIPANT_NAME';
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';


export const initParticipants = (participants) => ({
  type: INIT_PARTICIPANTS,
  payload: { participants }
});

export const setParticipantNameEmail  = (participantId, name, email, valid) => ({
  type: SET_PARTICIPANT_NAME_EMAIL,
  payload: { participantId, name, email, valid }
});

export const addParticipant  = () => ({
  type: ADD_PARTICIPANT,
  payload: {}
});

