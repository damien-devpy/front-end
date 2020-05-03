export const INIT_FIRST_ROUND = 'INIT_FIRST_ROUND';
export const INIT_NEXT_ROUND = 'INIT_NEXT_ROUND';
export const SET_INDIVIDUAL_ACTIONS = 'SET_INDIVIDUAL_ACTIONS';
export const SET_COLLECTIVE_ACTIONS = 'SET_COLLECTIVE_ACTIONS';
export const APPLY_INDIVIDUAL_ACTION = 'APPLY_INDIVIDUAL_ACTION';
export const WORKSHOP_RETRIEVED = 'WORKSHOP_RETRIEVED';
export const RETRIEVE_WORKSHOP = 'RETRIEVE_WORKSHOP';
export const WORKSHOP_LOAD_ERROR = 'WORKSHOP_LOAD_ERROR';
export const COMPUTE_CARBON_VARIABLES = 'COMPUTE_CARBON_VARIABLES';
export const VALIDATE_ROUND = 'VALIDATE_ROUND';

export const initFirstRound = (year) => ({
  type: INIT_FIRST_ROUND,
  payload: { year },
});

export const initNextRound = (year) => ({
  type: INIT_NEXT_ROUND,
  payload: { year },
});

export const setIndividualActions = (
  year,
  participantId,
  individualActionIds,
) => ({
  type: SET_INDIVIDUAL_ACTIONS,
  payload: { year, participantId, individualActionIds },
});

export const setCollectiveActions = (year, collectiveActionIds) => ({
  type: SET_COLLECTIVE_ACTIONS,
  payload: { year, collectiveActionIds },
});

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
