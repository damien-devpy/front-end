import { denormalize } from 'normalizr';

import { workshopSchema } from '../normalizers';

export const INIT_WORKSHOP = 'INIT_WORKSHOP';
export const START_ROUND = 'START_ROUND';
export const SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS =
  'SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS';
export const SET_COLLECTIVE_CHOICES = 'SET_COLLECTIVE_ACTIONS';
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
export const PERSIST_WORKSHOP = 'PERSIST_WORKSHOP';
export const WORKSHOP_PERSISTED = 'WORKSHOP_PERSISTED';

export const initWorkshop = (year, heatingNetworksData) => ({
  type: INIT_WORKSHOP,
  payload: { year, heatingNetworksData },
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

export const computeCarbonVariables = (participantId, heatingNetworksData) => ({
  type: COMPUTE_CARBON_VARIABLES,
  payload: { participantId, heatingNetworksData },
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

const persistWorkshop = (workshopId, workshop) => ({
  type: PERSIST_WORKSHOP,
  payload: { workshop },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: `/workshops/${workshopId}`,
        method: 'PUT',
        json: workshop,
      },
      // action to dispatch when effect succeeds:
      commit: { type: WORKSHOP_PERSISTED, meta: { workshopId } },
      // action to dispatch if network action fails permanently:
      // rollback: { type: 'REGISTER_USER_ROLLBACK', meta: { name, email } }
    },
  },
});

// citizens (pas implemente)
// models (pas necessaire car peut pas etre update)
// creatorId (non modifiable)
// id (non modifiable)
// rounds.citizenX (pas implemente)
// rounds.socialVariables (pas implemente)
// rounds.roundsConfig -> roundConfig (sans s)
// startAt -> startDate je crois
// currentYear : c'est un champ qui appartient a round non ? (round.year plus exactement)
// participants : tu peux enlever temporairement ? Il faut qu'on reflechisse a ce qu'on veut updater du cote participant
const cleanWorkshop = (workshop) => {
  const persistableWorkshop = { ...workshop };
  delete persistableWorkshop.model;
  delete persistableWorkshop.participants;
  delete persistableWorkshop.citizens;
  delete persistableWorkshop.creatorId;
  delete persistableWorkshop.id;
  delete persistableWorkshop.currentYear;
  persistableWorkshop.startAt = `${persistableWorkshop.startAt}Z`;
  const persistableRounds = persistableWorkshop.rounds.map((round) => {
    const persistableRound = { ...round };
    delete persistableRound.budget;
    delete persistableRound.socialVariables;
    delete persistableRound.citizenCarbonVariables;
    delete persistableRound.citizenCarbonFootprints;
    delete persistableRound.citizenIndividualChoices;
    return persistableRound;
  });
  persistableWorkshop.rounds = persistableRounds;
  return persistableWorkshop;
};

const persistWorkshopWithCurrentState = () => {
  return (dispatch, getState) => {
    const {
      workshop: { entities, result },
    } = getState();
    // console.log('persistWorkshopWithCurrentState entities', entities);
    // console.log('persistWorkshopWithCurrentState result', result);
    // console.log(
    //   'persistWorkshopWithCurrentState denormalized',
    //   JSON.stringify(denormalize(result, workshopSchema, entities))
    // );
    // console.log(
    //   'persistWorkshopWithCurrentState denormalized and clean ',
    //   JSON.stringify(
    //     cleanWorkshop(denormalize(result, workshopSchema, entities))
    //   )
    // );
    dispatch(
      persistWorkshop(
        result.id,
        cleanWorkshop(denormalize(result, workshopSchema, entities))
      )
    );
  };
};

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
    dispatch(persistWorkshopWithCurrentState());
  };
};
