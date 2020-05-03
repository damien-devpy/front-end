export const SET_PARTICIPANT_NAME_EMAIL = 'SET_PARTICIPANT_NAME';
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const RETRIEVE_PARTICIPANTS = 'RETRIEVE_PARTICIPANTS';
export const PARTICIPANTS_RETRIEVED = 'PARTICIPANTS_RETRIEVED';
export const PARTICIPANTS_LOAD_ERROR = 'PARTICIPANTS_LOAD_ERROR';
export const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';


export const participantsRetrieved = (participants) => ({
  type: PARTICIPANTS_RETRIEVED,
  payload: { participants }
});

export const retrieveParticipants = () => ({
  type: RETRIEVE_PARTICIPANTS,
  payload: [],
});

export const participantsLoadError = (error) => ({
  type: PARTICIPANTS_LOAD_ERROR,
  payload: error,
});

export const setParticipantNameEmail  = (participantId, name, email, persona, valid) => ({
  type: SET_PARTICIPANT_NAME_EMAIL,
  payload: { participantId, name, email, persona, valid }
});

export const addParticipant  = () => ({
  type: ADD_PARTICIPANT,
  payload: {}
});

export const deleteParticipant  = (id) => ({
  type: DELETE_PARTICIPANT,
  payload: {id}
});

