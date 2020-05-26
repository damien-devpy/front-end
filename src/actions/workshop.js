export const INIT_WORKSHOP = 'INIT_WORKSHOP';
export const START_ROUND = 'START_ROUND';
export const SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS =
  'SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS';
export const SET_COLLECTIVE_ACTIONS = 'SET_COLLECTIVE_ACTIONS';
export const WORKSHOP_RETRIEVED = 'WORKSHOP_RETRIEVED';
export const RETRIEVE_WORKSHOP = 'RETRIEVE_WORKSHOP';
export const WORKSHOP_LOAD_ERROR = 'WORKSHOP_LOAD_ERROR';
export const COMPUTE_CARBON_VARIABLES = 'COMPUTE_CARBON_VARIABLES';
export const APPLY_INDIVIDUAL_ACTIONS = 'APPLY_INDIVIDUAL_ACTIONS';
export const APPLY_COLLECTIVE_ACTIONS = 'APPLY_COLLECTIVE_ACTIONS';
export const COMPUTE_FOOTPRINTS = 'COMPUTE_FOOTPRINTS';
export const INIT_ROUND = 'INIT_ROUND';
export const SET_ACTIONS_FOR_CITIZENS = 'SET_ACTIONS_FOR_CITIZENS';
export const COMPUTE_FOOTPRINTS_FOR_CITIZENS =
  'COMPUTE_FOOTPRINTS_FOR_CITIZENS';
export const APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS =
  'APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS';
export const APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS =
  'APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS';
export const APPLY_SOCIAL_IMPACT = 'APPLY_SOCIAL_IMPACT';

export const initWorkshop = (year) => ({
  type: INIT_WORKSHOP,
  payload: { year },
});

export const startRound = (payload) => ({
  type: START_ROUND,
  payload,
});

export const setIndividualActionsForAllParticipants = (
  year,
  individualActionCards
) => ({
  type: SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS,
  payload: { year, individualActionCards },
});

export const setCollectiveActions = (year, collectiveActionCards) => ({
  type: SET_COLLECTIVE_ACTIONS,
  payload: { year, collectiveActionCards },
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

export const initRound = (year) => ({
  type: INIT_ROUND,
  payload: { year },
});

export const computeCarbonVariables = (participantId) => ({
  type: COMPUTE_CARBON_VARIABLES,
  payload: { participantId },
});

export const applyIndividualActions = (yearFrom, yearTo) => ({
  type: APPLY_INDIVIDUAL_ACTIONS,
  payload: { yearFrom, yearTo },
});

export const applyCollectiveActions = (yearFrom, yearTo) => ({
  type: APPLY_COLLECTIVE_ACTIONS,
  payload: { yearFrom, yearTo },
});

export const computeFootprints = (year) => ({
  type: COMPUTE_FOOTPRINTS,
  payload: { year },
});

export const setActionsForCitizens = (year) => ({
  type: SET_ACTIONS_FOR_CITIZENS,
  payload: { year },
});

export const computeFootprintsForCitizen = (year) => ({
  type: COMPUTE_FOOTPRINTS_FOR_CITIZENS,
  payload: { year },
});

export const applyIndivdualActionsForCitizens = (yearFrom, yearTo) => ({
  type: APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS,
  payload: { yearFrom, yearTo },
});

export const applyCollectiveActionsForCitizens = (yearFrom, yearTo) => ({
  type: APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS,
  payload: { yearFrom, yearTo },
});

export const applySocialImpact = (yearFrom, yearTo) => ({
  type: APPLY_SOCIAL_IMPACT,
  payload: { yearFrom, yearTo },
});

export const initRoundAndProcessModel = (yearFrom, yearTo) => {
  return (dispatch) => {
    dispatch(initRound(yearTo));
    dispatch(applyIndividualActions(yearFrom, yearTo));
    dispatch(applyCollectiveActions(yearFrom, yearTo));
    dispatch(applySocialImpact(yearFrom, yearTo));
    dispatch(setActionsForCitizens(yearTo));
    dispatch(applyIndivdualActionsForCitizens(yearFrom, yearTo));
    dispatch(applyCollectiveActionsForCitizens(yearFrom, yearTo));
    dispatch(computeFootprints(yearTo));
    dispatch(computeFootprintsForCitizen(yearTo));
  };
};
