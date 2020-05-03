import {
  INIT_FIRST_ROUND,
  INIT_NEXT_ROUND,
  SET_COLLECTIVE_ACTIONS,
  SET_INDIVIDUAL_ACTIONS,
  RETRIEVE_WORKSHOP,
  WORKSHOP_RETRIEVED,
  WORKSHOP_LOAD_ERROR,
  COMPUTE_CARBON_VARIABLES,
  VALIDATE_ROUND,
} from '../actions/workshop';
import { applyIndividualActions, computeFootprint } from './utils/model';

const initialState = {};

const initRoundObject = () => ({
  collectiveActionIds: [],
  participants: {},
  influenceScore: 0,
});

const computeCarbonVariables = (surveyVariables, globalVariables) => {
  const { hours_urban_bus_per_week, km_car_commute_per_day } = surveyVariables;
  const { MEAN_SPEED_URBAN_BUS, DAYS_PER_WEEK } = globalVariables;

  const km_urban_bus_per_week = hours_urban_bus_per_week * MEAN_SPEED_URBAN_BUS;
  const km_car_commute_per_week = km_car_commute_per_day * DAYS_PER_WEEK;

  return { km_urban_bus_per_week, km_car_commute_per_week };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_WORKSHOP: {
      return {
        ...state,
        isLoading: true,
        loadErrorDetails: null,
      };
    }
    case WORKSHOP_RETRIEVED: {
      const { workshop } = action.payload;
      return {
        isLoading: false,
        loadErrorDetails: null,
        ...workshop,
      };
    }
    case WORKSHOP_LOAD_ERROR: {
      return {
        ...state,
        isLoading: false,
        loadError: true,
        loadErrorDetails: action.payload,
      };
    }
    case INIT_FIRST_ROUND: {
      const { year } = action.payload;
      return {
        ...state,
        rounds: {
          byYear: {
            [year]: initRoundObject(),
          },
          allYears: [year],
        },
      };
    }
    case INIT_NEXT_ROUND: {
      const { year } = action.payload;
      return state.rounds.allYears.includes(year)
        ? state
        : {
          byYear: { ...state.rounds.byYear, [year]: initRoundObject() },
          allYears: [...state.rounds.allYears, year],
        };
    }
    case SET_COLLECTIVE_ACTIONS: {
      const { year, collectiveActionIds } = action.payload;
      return !state.rounds.allYears.includes(year)
        ? state
        : {
          byYear: {
            ...state.rounds.byYear,
            [year]: {
              ...state.rounds.byYear[year],
              collectiveActionIds: [
                ...new Set([
                  ...state.rounds.byYear[year].collectiveActionIds,
                  ...collectiveActionIds,
                ]),
              ],
            },
          },
          allYears: [...state.rounds.allYears],
        };
    }
    case SET_INDIVIDUAL_ACTIONS: {
      const { year, participantId, individualActionIds } = action.payload;
      return !state.rounds.allYears.includes(year)
        ? state
        : {
          ...state,
          rounds: {
            byYear: {
              ...state.rounds.byYear,
              [year]: {
                ...state.rounds.byYear[year],
                participants: {
                  ...state.rounds.byYear[year].participants,
                  [participantId]: {
                    ...state.rounds.byYear[year].participants[participantId],
                    individualActionIds: [
                      ...new Set([
                        ...state.rounds.byYear[year].participants[participantId]
                          .individualActionIds,
                        ...individualActionIds,
                      ]),
                    ],
                  },
                },
              },
            },
            allYears: [...state.rounds.allYears],
          },
        };
    }
    case COMPUTE_CARBON_VARIABLES: {
      const { participantId } = action.payload;
      const { surveyVariables } = state.participants.byId[participantId];
      const globalVariables = state.model.globalCarbonVariables;
      const newCarbonVariables = computeCarbonVariables(surveyVariables, globalVariables);
      return {
        ...state,
        participants: {
          byId: {
            ...state.participants.byId,
            [participantId]: {
              ...state.participants.byId[participantId],
              carbonVariables: newCarbonVariables,
            },
            allIds: [...state.participants.allIds],
          },
        },
      };
    }
    case VALIDATE_ROUND: {
      const { year } = action.payload;
      const currentRound = state.rounds.byYear[year];
      const newRound = {
        year: currentRound.roundConfig.targetedYear,
        participants: {
          byId: {},
          allIs: currentRound.participants.allIds,
        },
      };
      currentRound.participants.allIds.forEach((id) => {
        const currentParticipant = currentRound.participants.byId[id];
        newRound.participants.byId[id] = {
          carbonVariables: applyIndividualActions(
            currentParticipant.carbonVariables,
            currentParticipant.actionTakenIds.map((actionId) => state.model.actions[actionId]),
          ),
        };
      });
      currentRound.participants.allIds.forEach((id) => {
        const { carbonVariables } = newRound.participants.byId[id];
        newRound.participants.byId[id].carbonFootprint = computeFootprint(
          state.model.footprintStructure,
          state.model.variableFormulas,
          carbonVariables,
          state.model.globalCarbonVariables,
        );
      });
      return {
        ...state,
        rounds: {
          byYear: {
            ...state.rounds.byYear,
            [currentRound.roundConfig.targetedYear]: newRound,
          },
        },
      };
    }
    default:
      return state;
  }
};
