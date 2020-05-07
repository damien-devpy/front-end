import {
  INIT_WORKSHOP,
  START_ROUND,
  SET_COLLECTIVE_ACTIONS,
  SET_INDIVIDUAL_ACTIONS,
  COMPUTE_FOOTPRINT,
  APPLY_INDIVIDUAL_ACTION,
  RETRIEVE_WORKSHOP,
  WORKSHOP_RETRIEVED,
  WORKSHOP_LOAD_ERROR,
  COMPUTE_CARBON_VARIABLES,
} from '../actions/workshop';
import jsonLogic from 'json-logic-js';

const initialState = {};

const initRoundObject = () => ({
  collectiveActionIds: [],
  participants: {},
  influenceScore: 0,
});
// Maps a function to all leaves of a json tree.
const objectLeavesMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v], i) =>
      typeof v === 'object' ? [k, objectLeavesMap(v, fn)] : [k, fn(v, k, i)]
    )
  );

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
    case INIT_WORKSHOP: {
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
    case START_ROUND: {
      const {
        actionType,
        currentYear,
        targetedYear,
        budget,
        actionCardBatchIds,
      } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          roundsConfig: {
            ...state.entities.roundsConfig,
            [currentYear]: {
              actionType,
              targetedYear,
              budget,
              actionCardBatchIds,
            },
          },
          rounds: {
            ...state.entities.rounds,
            [currentYear]: {
              ...state.entities.rounds[currentYear],
              roundsConfig: currentYear,
            },
          },
        },
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
                    ...state.rounds.byYear[year]['collectiveActionIds'],
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
                    ...state.rounds.byYear[year]['participants'],
                    [participantId]: {
                      ...state.rounds.byYear[year]['participants'][
                        participantId
                      ],
                      individualActionIds: [
                        ...new Set([
                          ...state.rounds.byYear[year]['participants'][
                            participantId
                          ].individualActionIds,
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
    case COMPUTE_FOOTPRINT: {
      const { participantId, year } = action.payload;
      const {
        footprintStructure,
        variableFormulas,
        globalCarbonVariables,
      } = state.model;
      const participant = state.rounds.byYear[year].participants[participantId];
      const carbonVariables = participant.carbonVariables;

      const computedFootprint = objectLeavesMap(
        footprintStructure,
        (variableKey) =>
          jsonLogic.apply(variableFormulas[variableKey], {
            ...carbonVariables,
            ...globalCarbonVariables,
          })
      );
      return {
        ...state,
        rounds: {
          byYear: {
            ...state.rounds.byYear,
            [year]: {
              ...state.rounds.byYear[year],
              participants: {
                ...state.rounds.byYear[year]['participants'],
                [participantId]: {
                  ...state.rounds.byYear[year]['participants'][participantId],
                  computedFootprint,
                },
              },
            },
          },
          allYears: [...state.rounds.allYears],
        },
      };
    }
    case APPLY_INDIVIDUAL_ACTION: {
      const { yearFrom, yearTo, participantId, actionId } = action.payload;
      const individualAction = state.model.actions[actionId];
      const newCarbonVariables = {
        ...state.rounds.byYear[yearFrom].participants[participantId]
          .carbonVariables,
      };
      individualAction.operations.forEach((operation) => {
        newCarbonVariables[operation.variable] = jsonLogic.apply(
          operation.operation,
          {
            ...state.rounds.byYear[yearFrom].participants[participantId]
              .carbonVariables,
          }
        );
      });
      return {
        ...state,
        rounds: {
          byYear: {
            ...state.rounds.byYear,
            [yearTo]: {
              ...state.rounds.byYear[yearTo],
              participants: {
                ...state.rounds.byYear[yearTo]['participants'],
                [participantId]: {
                  ...state.rounds.byYear[yearTo]['participants'][participantId],
                  carbonVariables: newCarbonVariables,
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
      const surveyVariables =
        state.participants.byId[participantId].surveyVariables;
      const globalVariables = state.model.globalCarbonVariables;
      const newCarbonVariables = computeCarbonVariables(
        surveyVariables,
        globalVariables
      );
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
    default:
      return state;
  }
};
