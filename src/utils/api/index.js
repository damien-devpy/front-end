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

export const createWorkshopApi = ({ data }) =>
  handleFetch('/workshops', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateWorkshopApi = ({ workshopId, data }) =>
  handleFetch(`/workshops/${workshopId}`, {
    method: 'PUT',
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

export const createCoachApi = ({ data }) =>
  handleFetch('/coaches', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteCoachApi = ({ coachId }) =>
  handleFetch(`/coaches/${coachId}`, {
    method: 'DELETE',
    type: 'empty',
  });
