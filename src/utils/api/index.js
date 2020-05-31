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
    // token:
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTA5MjA4MjEsIm5iZiI6MTU5MDkyMDgyMSwianRpIjoiNGUzNzAyNDItZGE5My00MTVkLTllM2UtZDM0YzFhOWZhYTNiIiwiZXhwIjoxNTkxMDkzNjIxLCJpZGVudGl0eSI6IjBhNjAyOGY2MTdlNTQyOTdhNWI0ZTE1NzJmMWMxM2M3IiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.1dSseTZjBCoN_9tI77URDhRXOEjn31dQ6eooDYZ0Spg',
  });

export const getParticipants = () =>
  handleFetch(`/participants`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getPersonas = () =>
  handleFetch(`/personas`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshops = () =>
  handleFetch(`/workshops`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getFootprints = () =>
  handleFetch(`/footprints`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshop = () =>
  handleFetch(`/workshop`, {
    normalizer: workshopSchema,
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });
