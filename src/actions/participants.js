// export const SET_PARTICIPANT_NAME_EMAIL = 'SET_PARTICIPANT_NAME';
export const SET_PARTICIPANT_PERSONA = 'SET_PARTICIPANT_PERSONA';
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';

export const setParticipantPersona = (participantId, persona) => ({
  type: SET_PARTICIPANT_PERSONA,
  payload: {
    participantId,
    persona,
  },
});

export const addParticipant = (data) => ({
  type: ADD_PARTICIPANT,
  payload: data,
});

export const deleteParticipant = (id) => ({
  type: DELETE_PARTICIPANT,
  payload: { id },
});
