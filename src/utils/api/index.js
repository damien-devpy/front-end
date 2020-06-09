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

export const getParticipants = () =>
  handleFetch(`/participants`, {
    // useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getPersonas = () =>
  handleFetch(`/personas`, {
    // useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshops = () =>
  handleFetch(`/workshops`, {
    //useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getFootprints = () =>
  handleFetch(`/footprints`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshop = ({ workshopId }) =>
  handleFetch(`/workshops/${workshopId}`, {
    normalizer: workshopSchema,
    useMock: true, // TO REMOVE AFTER BACKEND READY
    mockOptions: { workshopId },
  });
