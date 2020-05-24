import {
  APPLY_COLLECTIVE_ACTIONS,
  APPLY_INDIVIDUAL_ACTIONS,
  APPLY_SOCIAL_IMPACT,
  COMPUTE_CARBON_VARIABLES,
  COMPUTE_FOOTPRINTS,
  INIT_ROUND,
  INIT_WORKSHOP,
  RETRIEVE_WORKSHOP,
  SET_COLLECTIVE_ACTIONS,
  SET_INDIVIDUAL_ACTIONS,
  SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS,
  START_ROUND,
  WORKSHOP_LOAD_ERROR,
  WORKSHOP_RETRIEVED,
} from '../actions/workshop';
import {
  computeFootprint,
  computeNewCarbonVariables,
  computeSocialVariables,
  valueOnAllLevels,
} from './utils/model';
import { makeYearParticipantKey } from '../utils/helpers';

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
    case INIT_ROUND: {
      const { year } = action.payload;
      const newRound = {
        year,
      };
      return {
        ...state,
        entities: {
          ...state.entities,
          rounds: {
            [year]: newRound,
            ...state.entities.rounds,
          },
        },
      };
    }
    case START_ROUND: {
      const {
        actionCardType,
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
              actionCardType,
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
    case SET_INDIVIDUAL_ACTIONS: {
      const { year, participantId, individualActionIds } = action.payload;
      return {
        ...state,
        result: {
          ...state.result,
          currentYear: state.entities.roundsConfig[year].targetedYear,
        },
        entities: {
          ...state.entities,
          individualActionCards: {
            ...state.entities.individualActionCards,
            [`${year}-${participantId}`]: {
              participantId,
              actionsIds: individualActionIds,
            },
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              individualActionCards: [
                ...(state.entities.rounds[year].individualActionCards || []),
                `${year}-${participantId}`,
              ],
            },
          },
        },
      };
    }
    case SET_INDIVIDUAL_ACTIONS_FOR_ALL_PARTICIPANTS: {
      const { year, individualActionCards } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          individualActionCards: {
            ...state.entities.individualActionCards,
            ...individualActionCards,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              individualActionCards: [
                ...(state.entities.rounds[year].individualActionCards || []),
                ...Object.keys(individualActionCards),
              ],
            },
          },
        },
        result: {
          ...state.result,
          currentYear: state.entities.roundsConfig[year].targetedYear,
        },
      };
    }
    case SET_COLLECTIVE_ACTIONS: {
      const { year, collectiveActionCards } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          collectiveActionCards: {
            ...state.entities.collectiveActionCards,
            ...collectiveActionCards,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              collectiveActionCards: [
                ...(state.entities.rounds[year].collectiveActionCards || []),
                ...Object.keys(collectiveActionCards),
              ],
            },
          },
        },
        result: {
          ...state.result,
          currentYear: state.entities.roundsConfig[year].targetedYear,
        },
      };
    }
    case APPLY_INDIVIDUAL_ACTIONS: {
      const { year } = action.payload;
      const currentRoundConfig = state.entities.roundsConfig[year];
      const nextYear = currentRoundConfig.targetedYear;
      const currentCarbonVariables = state.entities.carbonVariables;
      const { participants } = state.result;

      const newCarbonVariables = {};
      participants.forEach((participantId) => {
        const yearParticipantKey = makeYearParticipantKey(year, participantId);
        const nextYearParticipantKey = makeYearParticipantKey(
          nextYear,
          participantId
        );
        const actionCardIds =
          state.entities.individualActionCards &&
          state.entities.individualActionCards.actionCardIds
            ? state.entities.individualActionCards.actionCardIds
            : [];
        const takenActionCards = actionCardIds.map(
          (actionId) => state.entities.actionCards[actionId]
        );
        newCarbonVariables[nextYearParticipantKey] = {
          participantId,
          variables: {
            ...currentCarbonVariables[yearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCarbonVariables[yearParticipantKey].variables,
              takenActionCards
            ),
          },
        };
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          carbonVariables: {
            ...state.entities.carbonVariables,
            ...newCarbonVariables,
          },
          globalCarbonVariables: {
            ...state.entities.globalCarbonVariables,
            [nextYear]: { ...state.entities.globalCarbonVariables[year] },
          },
          rounds: {
            ...state.entities.rounds,
            [nextYear]: {
              ...state.entities.rounds[nextYear],
              carbonVariables: state.result.participants.map((participantId) =>
                makeYearParticipantKey(nextYear, participantId)
              ),
            },
          },
        },
      };
    }
    case APPLY_COLLECTIVE_ACTIONS: {
      const { year } = action.payload;
      const currentRoundConfig = state.entities.roundsConfig[year];
      const nextYear = currentRoundConfig.targetedYear;
      const currentCarbonVariables = state.entities.carbonVariables;
      const currentGlobalCarbonVariables = state.entities.globalCarbonVariables;
      const { participants } = state.result;
      let actionCardIds;

      if (state.entities.collectiveActionCards) {
        actionCardIds = state.entities.collectiveActionCards[year]
          ? state.entities.collectiveActionCards[year].actionCardIds
          : [];
      } else {
        actionCardIds = [];
      }

      const takenActionCardsThatApplyToEveryone = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.type === 'everyone');
      const newCarbonVariables = {};
      participants.forEach((participantId) => {
        const yearParticipantKey = makeYearParticipantKey(year, participantId);
        const nextYearParticipantKey = makeYearParticipantKey(
          nextYear,
          participantId
        );
        newCarbonVariables[nextYearParticipantKey] = {
          participantId,
          variables: {
            ...currentCarbonVariables[yearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCarbonVariables[yearParticipantKey].variables,
              takenActionCardsThatApplyToEveryone
            ),
          },
        };
      });
      const takenActionCardsThatApplyGlobally = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.type === 'global');

      return {
        ...state,
        entities: {
          ...state.entities,
          carbonVariables: {
            ...state.entities.carbonVariables,
            ...newCarbonVariables,
          },
          globalCarbonVariables: {
            ...state.entities.globalCarbonVariables,
            [nextYear]: {
              ...state.entities.globalCarbonVariables[year],
              ...computeNewCarbonVariables(
                currentGlobalCarbonVariables[year],
                takenActionCardsThatApplyGlobally
              ),
            },
          },
          rounds: {
            ...state.entities.rounds,
            [nextYear]: {
              ...state.entities.rounds[nextYear],
              carbonVariables: state.result.participants.map((participantId) =>
                makeYearParticipantKey(nextYear, participantId)
              ),
              globalCarbonVariables: nextYear,
            },
          },
        },
      };
    }
    case APPLY_SOCIAL_IMPACT: {
      const { year } = action.payload;
      const currentSocialVariables = state.entities.rounds.socialVariables;
      const newSocialVariables = computeSocialVariables(currentSocialVariables);
      return {
        ...state,
        entities: {
          ...state.entities,
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              socialVariables: newSocialVariables,
            },
          },
        },
      };
    }
    case COMPUTE_FOOTPRINTS: {
      const { year } = action.payload;
      const { carbonVariables, globalCarbonVariables } = state.entities;
      const { participants } = state.result;
      const { footprintStructure, variableFormulas } = state.result.model;
      const newCarbonFootprints = {};
      participants.forEach((participantId) => {
        const yearParticipantKey = makeYearParticipantKey(year, participantId);
        const carbonVariablesForParticipant =
          carbonVariables[yearParticipantKey].variables;
        const globalCarbonVariablesForYear = globalCarbonVariables[year];
        newCarbonFootprints[yearParticipantKey] = {
          ...newCarbonFootprints[yearParticipantKey],
          participantId,
          footprint: valueOnAllLevels(
            computeFootprint(
              footprintStructure,
              variableFormulas,
              carbonVariablesForParticipant,
              globalCarbonVariablesForYear
            )
          ),
        };
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          carbonFootprints: {
            ...state.entities.carbonFootprints,
            ...newCarbonFootprints,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              carbonFootprints: state.result.participants.map((participantId) =>
                makeYearParticipantKey(year, participantId)
              ),
            },
          },
        },
      };
    }
    case COMPUTE_CARBON_VARIABLES: {
      const { participantId } = action.payload;
      const { surveyVariables } = state.participants.byId[participantId];
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
