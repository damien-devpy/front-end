import { denormalize } from 'normalizr';

import handleFetch from './handleFetch';
import { getAccessToken } from '../auth';
import { workshopSchema } from '../../normalizers';

const cleanWorkshop = (workshop) => {
  const persistableWorkshop = { ...workshop };
  delete persistableWorkshop.model;
  delete persistableWorkshop.participants;
  // delete persistableWorkshop.citizens;
  delete persistableWorkshop.creatorId;
  delete persistableWorkshop.id;
  delete persistableWorkshop.address;
  // delete persistableWorkshop.rounds;
  persistableWorkshop.startAt = `${persistableWorkshop.startAt}Z`;
  // if (!persistableWorkshop.currentYear) {
  // persistableWorkshop.currentYear = 2020;
  // }
  // const persistableRounds = persistableWorkshop.rounds.map((round) => {
  //   const persistableRound = { ...round };
  //   // delete persistableRound.socialVariables;
  //   // delete persistableRound.citizenIndividualChoices;
  //   return persistableRound;
  // });
  // persistableWorkshop.rounds = persistableRounds;
  return persistableWorkshop;
};

export const denormalizeWorkshop = (workshop) => {
  const { entities, result } = workshop;
  return cleanWorkshop(denormalize(result, workshopSchema, entities));
};

export const denormalizeWorkshopWithoutClean = (workshop) => {
  const { entities, result } = workshop;
  return denormalize(result, workshopSchema, entities);
};

export const getCurrentUser = () => handleFetch('/users/me');

export const login = (data) =>
  handleFetch('/login', {
    method: 'POST',
    body: data,
  });

export const changePassword = ({ password, accessToken }) =>
  handleFetch(
    `/reset_password?access_token=${accessToken || getAccessToken()}`,
    {
      method: 'POST',
      body: JSON.stringify({ password }),
      type: 'empty',
    }
  );

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

export const updateWorkshopApi = ({ workshopId, data }) => {
  const denormalizedWorkshop = denormalizeWorkshop(data);
  return handleFetch(`/workshops/${workshopId}`, {
    method: 'PUT',
    body: JSON.stringify(denormalizedWorkshop),
    type: 'empty',
  });
};

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

export const createParticipantApi = ({ workshopId, data }) =>
  handleFetch(`/workshops/${workshopId}/participants`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const deleteParticipantApi = ({ workshopId, participantId }) =>
  handleFetch(`/workshops/${workshopId}/participants/${participantId}`, {
    method: 'DELETE',
    type: 'empty',
  });

export const changeParticipantApi = ({ data }) =>
  handleFetch(
    `/workshops/${data.workshopId}/participants/${data.participantId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ personaId: data.personaId }),
    }
  );

export const sendFormApi = ({ workshopId, participantId }) =>
  // old API
  // handleFetch(`/workshops/${workshopId}/participants/send_form`, {
  //   method: 'POST',
  //   body: JSON.stringify([participantId]),
  // });

  // current API
  handleFetch(
    `/workshops/${workshopId}/participants/${participantId}/send_form`,
    {
      method: 'POST',
    }
  );

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

export const updateSurveyVariablesApi = ({ data, workshopId, participantId }) =>
  handleFetch(`/carbon_footprint_form_answers/${workshopId}/${participantId}`, {
    method: 'PUT',
    body: JSON.stringify({ answers: data }),
  });

export const validateParticipantApi = ({ data, workshopId }) =>
  handleFetch(`/workshops/${workshopId}/validate_participants`, {
    method: 'POST',
    body: JSON.stringify({ participantIds: data }),
  });
