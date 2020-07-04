export const ADD_COACH = 'ADD_COACH';
export const COACHES_RETRIEVED = 'COACHES_RETRIEVED';
export const RETRIEVE_COACHES = 'RETRIEVE_COACHES';
export const COACHES_LOAD_ERROR = 'COACHES_LOAD_ERROR';
export const DELETE_COACH = 'DELETE_COACH';

export const coachesRetrieved = (coaches) => ({
  type: COACHES_RETRIEVED,
  payload: { coaches },
});

export const retrieveCoaches = () => ({
  type: RETRIEVE_COACHES,
  payload: [],
});

export const coachesLoadError = (error) => ({
  type: COACHES_LOAD_ERROR,
  payload: error,
});

export const addCoach = (coach) => ({
  type: ADD_COACH,
  payload: { coach },
});

export const deleteCoach = (coachId) => ({
  type: DELETE_COACH,
  payload: { coachId },
});
