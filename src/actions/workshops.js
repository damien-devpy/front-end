import { createWorkshopApi, deleteWorkshopApi } from '../utils/api';

export const ADD_WORKSHOP = 'ADD_WORKSHOP';
export const WORKSHOPS_RETRIEVED = 'WORKSHOPS_RETRIEVED';
export const RETRIEVE_WORKSHOPS = 'RETRIEVE_WORKSHOPS';
export const WORKSHOPS_LOAD_ERROR = 'WORKSHOPS_LOAD_ERROR';
export const DELETE_WORKSHOP = 'DELETE_WORKSHOP';

export const workshopsRetrieved = (workshops) => ({
  type: WORKSHOPS_RETRIEVED,
  payload: { workshops },
});

export const retrieveWorkshops = () => ({
  type: RETRIEVE_WORKSHOPS,
  payload: [],
});

export const workshopsLoadError = (error) => ({
  type: WORKSHOPS_LOAD_ERROR,
  payload: error,
});

const addWorkshop = (workshop) => ({
  type: ADD_WORKSHOP,
  payload: { workshop },
});

const deleteWorkshop = (workshopId) => ({
  type: DELETE_WORKSHOP,
  payload: { workshopId },
});

export const createAsyncWorkshop = (workshop) => (dispatch) => {
  createWorkshopApi({ data: workshop })
    .then((data) => dispatch(addWorkshop(data)))
    .catch((error) => console.log);
};

export const deleteAsyncWorkshop = (workshopId) => (dispatch) => {
  deleteWorkshopApi({ workshopId })
    .then(() => {
      console.log('dispatch deleteWorkshop ', workshopId);
      dispatch(deleteWorkshop(workshopId));
    })
    .catch((error) => console.log);
};
