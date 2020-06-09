export const SET_PARTICIPANT_NAME_EMAIL = 'SET_PARTICIPANT_NAME';
export const ADD_PARTICIPANT = 'ADD_PARTICIPANT';
export const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';

export const setParticipantNameEmail = (
  participantId,
  name,
  email,
  persona,
  valid
) => ({
  type: SET_PARTICIPANT_NAME_EMAIL,
  payload: {
    participantId,
    name,
    email,
    persona,
    valid,
  },
});

export const addParticipant = () => ({
  type: ADD_PARTICIPANT,
  payload: {},
});

export const deleteParticipant = (id) => ({
  type: DELETE_PARTICIPANT,
  payload: { id },
});
