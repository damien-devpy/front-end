export const ADD_WORKSHOP = "ADD_WORKSHOP";
export const WORKSHOPS_RETRIEVED = "WORKSHOPS_RETRIEVED";
export const RETRIEVE_WORKSHOPS = "RETRIEVE_WORKSHOPS";
export const WORKSHOPS_LOAD_ERROR = "WORKSHOPS_LOAD_ERROR";

export const workshopsRetrieved = workshops => ({
  type: WORKSHOPS_RETRIEVED,
  payload: { workshops }
});

export const retrieveWorkshops = () => ({
  type: RETRIEVE_WORKSHOPS,
  payload: []
});

export const workshopsLoadError = error => ({
  type: WORKSHOPS_LOAD_ERROR,
  payload: error
});

export const addWorkshop = workshop => ({
  type: ADD_WORKSHOP,
  payload: { workshop }
});
