export const INIT_WORKSHOP = 'INIT_WORKSHOP';
export const START_ROUND = 'START_ROUND';
export const SET_INDIVIDUAL_ACTIONS = 'SET_INDIVIDUAL_ACTIONS';
export const SET_COLLECTIVE_ACTIONS = 'SET_COLLECTIVE_ACTIONS';
export const COMPUTE_FOOTPRINT = 'COMPUTE_FOOTPRINT';
export const APPLY_INDIVIDUAL_ACTION = 'APPLY_INDIVIDUAL_ACTION';
export const WORKSHOP_RETRIEVED = 'WORKSHOP_RETRIEVED';
export const RETRIEVE_WORKSHOP = 'RETRIEVE_WORKSHOP';
export const WORKSHOP_LOAD_ERROR = 'WORKSHOP_LOAD_ERROR';
export const COMPUTE_CARBON_VARIABLES = 'COMPUTE_CARBON_VARIABLES';
export const VALIDATE_ROUND = 'VALIDATE_ROUND';

export const initWorkshop = (year) => ({
  type: INIT_WORKSHOP,
  payload: { year },
});

export const startRound = (payload) => ({
  type: START_ROUND,
  payload: payload,
});

export const setIndividualActions = (
  year,
  participantId,
  individualActionIds
) => ({
  type: SET_INDIVIDUAL_ACTIONS,
  payload: { year, participantId, individualActionIds },
});

export const setCollectiveActions = (year, collectiveActionIds) => ({
  type: SET_COLLECTIVE_ACTIONS,
  payload: { year, collectiveActionIds },
});

export const computeFootprint = (year, participantId) => {
  return {
    type: COMPUTE_FOOTPRINT,
    payload: { year, participantId },
  };
};

export const applyIndividualAction = (
  yearFrom,
  yearTo,
  participantId,
  actionId
) => {
  return {
    type: APPLY_INDIVIDUAL_ACTION,
    payload: { yearFrom, yearTo, participantId, actionId },
  };
};

export const workshopRetrieved = (workshop) => ({
  type: WORKSHOP_RETRIEVED,
  payload: { workshop },
});

export const retrieveWorkshop = () => ({
  type: RETRIEVE_WORKSHOP,
  payload: [],
});

export const workshopLoadError = (error) => ({
  type: WORKSHOP_LOAD_ERROR,
  payload: error,
});

export const computeCarbonVariables = (participantId) => ({
  type: COMPUTE_CARBON_VARIABLES,
  payload: { participantId },
});

export const validateRound = (year) => ({
  type: VALIDATE_ROUND,
  payload: { year },
});
