import handleFetch from './handleFetch';
import { workshopSchema } from '../../normalizers';

export const getCurrentUser = () => handleFetch('/users/me');

export const login = (data) =>
  handleFetch('/login', {
    method: 'POST',
    body: data,
  });

export const getCoaches = () =>
  handleFetch(`/coaches`, {
    // useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshops = () =>
  handleFetch(`/workshops`, {
    // useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const createWorkshopApi = ({ data, ...rest }) =>
  handleFetch('/workshops', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getWorkshop = ({ workshopId }) =>
  handleFetch(`/workshops/${workshopId}`, {
    normalizer: workshopSchema,
    // useMock: true, // TO REMOVE AFTER BACKEND READY
    // mockOptions: { workshopId },
  });

export const deleteWorkshopApi = ({ workshopId }) =>
  handleFetch(`/workshops/${workshopId}`, {
    method: 'DELETE',
    type: 'empty',
  });

export const createParticipantApi = ({ data }) => {
  console.log("Create Participant API", data);
  return handleFetch(`/workshops/${data.workshopId}/participants`, {
    method: 'POST',
    body: JSON.stringify(data.values),
  });};

export const deleteParticipantApi = ({ workshopId, participantId }) =>
  handleFetch(`/workshops/${workshopId}/participants/${participantId}`, {
    method: 'DELETE',
    type: 'empty',
  });
