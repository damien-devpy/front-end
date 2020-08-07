import Papa from 'papaparse';

import { denormalizeWorkshop, updateWorkshopApi } from '../utils/api';
import { selectCurrentWorkshopInfo } from '../selectors/workshopSelector';
import { throwError } from './errors';

// Workshop actions
export const INIT_WORKSHOP = 'INIT_WORKSHOP';
export const UPDATE_WORKSHOP = 'UPDATE_WORKSHOP';
export const WORKSHOP_UPDATED = 'WORKSHOP_UPDATED';
export const PERSIST_WORKSHOP = 'PERSIST_WORKSHOP';
export const WORKSHOP_PERSISTED = 'WORKSHOP_PERSISTED';
export const END_WORKSHOP = 'END_WORKSHOP';

// Round actions
export const INIT_ROUND = 'INIT_ROUND';
export const START_ROUND = 'START_ROUND';
export const SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS =
  'SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS';
export const SET_COLLECTIVE_CHOICES = 'SET_COLLECTIVE_ACTIONS';
export const WORKSHOP_RETRIEVED = 'WORKSHOP_RETRIEVED';
export const RETRIEVE_WORKSHOP = 'RETRIEVE_WORKSHOP';
export const WORKSHOP_LOAD_ERROR = 'WORKSHOP_LOAD_ERROR';
export const COMPUTE_CARBON_VARIABLES = 'COMPUTE_CARBON_VARIABLES';
export const APPLY_INDIVIDUAL_ACTIONS = 'APPLY_INDIVIDUAL_ACTIONS';
export const APPLY_COLLECTIVE_ACTIONS = 'APPLY_COLLECTIVE_ACTIONS';
export const COMPUTE_FOOTPRINTS = 'COMPUTE_FOOTPRINTS';
export const SET_ACTIONS_FOR_CITIZENS = 'SET_ACTIONS_FOR_CITIZENS';
export const COMPUTE_FOOTPRINTS_FOR_CITIZENS =
  'COMPUTE_FOOTPRINTS_FOR_CITIZENS';
export const APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS =
  'APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS';
export const APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS =
  'APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS';
export const APPLY_SOCIAL_IMPACT = 'APPLY_SOCIAL_IMPACT';

export const initWorkshop = (year, heatNetworksData) => ({
  type: INIT_WORKSHOP,
  payload: { year, heatNetworksData },
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

const persistWorkshop = (workshop) => {
  console.log('persistWorkshop', workshop);
  return (dispatch) => {
    const {
      result: { id: workshopId },
    } = workshop;
    updateWorkshopApi({
      workshopId,
      data: workshop,
    })
      .then((res) => {
        dispatch({
          type: WORKSHOP_PERSISTED,
          payload: { workshop },
        });
        return res;
      })
      .catch((error) => {
        dispatch(throwError(error.message));
      });
  };
};

// const persistWorkshopOffline = (workshopId, workshop) => {
//   return {
//     type: PERSIST_WORKSHOP,
//     payload: { workshop },
//     meta: {
//       offline: {
//         // the network action to execute:
//         effect: {
//           url: `/workshops/${workshopId}`,
//           method: 'PUT',
//           json: workshop,
//         },
//         // action to dispatch when effect succeeds:
//         commit: { type: WORKSHOP_PERSISTED, meta: { workshopId } },
//         // action to dispatch if network action fails permanently:
//         // rollback: { type: 'REGISTER_USER_ROLLBACK', meta: { name, email } }
//       },
//     },
//   };
// };

// const persistWorkshopOfflineWithCurrentState = () => {
//   return (dispatch, getState) => {
//     const {
//       workshop,
//       workshop: {
//         result: { id: workshopId },
//       },
//     } = getState();
//     dispatch(persistWorkshopOffline(workshopId, denormalizeWorkshop(workshop)));
//   };
// };

export const initRound = (year) => ({
  type: INIT_ROUND,
  payload: { year },
});

export const startRound = (payload) => ({
  type: START_ROUND,
  payload,
});

export const setIndividualChoicesForAllParticipants = (
  year,
  individualChoices
) => ({
  type: SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS,
  payload: { year, individualChoices },
});

export const setCollectiveChoices = (year, collectiveChoices) => ({
  type: SET_COLLECTIVE_CHOICES,
  payload: { year, collectiveChoices },
});

export const computeCarbonVariables = (participantId, heatNetworksData) => ({
  type: COMPUTE_CARBON_VARIABLES,
  payload: { participantId, heatNetworksData },
});

const applyIndividualActions = (yearFrom, yearTo) => ({
  type: APPLY_INDIVIDUAL_ACTIONS,
  payload: { yearFrom, yearTo },
});

const applyCollectiveActions = (yearFrom, yearTo) => ({
  type: APPLY_COLLECTIVE_ACTIONS,
  payload: { yearFrom, yearTo },
});

const computeFootprints = (year) => ({
  type: COMPUTE_FOOTPRINTS,
  payload: { year },
});

const setActionsForCitizens = (year) => ({
  type: SET_ACTIONS_FOR_CITIZENS,
  payload: { year },
});

const computeFootprintsForCitizen = (year) => ({
  type: COMPUTE_FOOTPRINTS_FOR_CITIZENS,
  payload: { year },
});

const applyIndivdualActionsForCitizens = (yearFrom, yearTo) => ({
  type: APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS,
  payload: { yearFrom, yearTo },
});

const applyCollectiveActionsForCitizens = (yearFrom, yearTo) => ({
  type: APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS,
  payload: { yearFrom, yearTo },
});

const applySocialImpact = (yearFrom, yearTo) => ({
  type: APPLY_SOCIAL_IMPACT,
  payload: { yearFrom, yearTo },
});

export const endWorkshop = () => ({
  type: END_WORKSHOP,
  payload: {},
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
    dispatch((dispatch2, getState) => {
      const { currentYear, endYear, status } = selectCurrentWorkshopInfo(
        getState()
      );
      if (currentYear === endYear) {
        // The workshop reaches the last year (2050)
        // End the workshop and save it for the last time
        dispatch2(endWorkshop());
        dispatch2(persistWorkshop(getState().workshop));
      }
      if (status !== 'ended') {
        // Save workshop only if it is not ended
        dispatch2(persistWorkshop(getState().workshop));
      } else {
        // eslint-disable-next-line no-console
        console.log('Workshop ended. Do not save it');
      }
    });
    // dispatch(persistWorkshopOfflineWithCurrentState());
  };
};

export const startWorkshop = (startYear) => {
  return (dispatch) => {
    fetch('/data/heat_networks.csv')
      .then((response) => response.text())
      .then((text) => Papa.parse(text, { header: true }))
      .then((heatNetworksData) => {
        dispatch(initWorkshop(startYear, heatNetworksData.data));
        dispatch(computeFootprints(startYear));
        dispatch(computeFootprintsForCitizen(startYear));
        dispatch((dispatch2, getState) => {
          const { workshop } = getState();
          dispatch2(persistWorkshop(workshop));
        });
      });
  };
};
