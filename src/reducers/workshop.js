import {pathOr} from 'ramda';
import computeCarbonVariables from './utils/bufferCarbonVariables';
import {
  APPLY_COLLECTIVE_ACTIONS,
  APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS,
  APPLY_INDIVIDUAL_ACTIONS,
  APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS,
  APPLY_SOCIAL_IMPACT,
  COMPUTE_CARBON_VARIABLES,
  COMPUTE_FOOTPRINTS,
  COMPUTE_FOOTPRINTS_FOR_CITIZENS,
  INIT_ROUND,
  INIT_WORKSHOP,
  RETRIEVE_WORKSHOP,
  SET_ACTIONS_FOR_CITIZENS,
  SET_COLLECTIVE_CHOICES,
  SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS,
  START_ROUND,
  WORKSHOP_LOAD_ERROR,
  WORKSHOP_RETRIEVED,
} from '../actions/workshop';
import {
  computeBudget,
  computeCitizenIndividualActionCards,
  computeFootprint,
  computeNewCarbonVariables,
  computeSocialVariables,
  valueOnAllLevels,
} from './utils/model';
import { makeYearParticipantKey } from '../utils/helpers';

const initialState = {
  isLoading: true,
  entities: {
    carbonFootprints: {
      '2020-1': {
        footprint: [
          {
            name: 'transport',
            children: {},
          },
        ],
      },
    },
  },
};

const initRoundObject = () => ({
  collectiveActionIds: [],
  participants: {},
  influenceScore: 0,
});

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
    case SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS: {
      const { year, individualChoices } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          individualChoices: {
            ...state.entities.individualChoices,
            ...individualChoices,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              individualChoices: [
                ...(state.entities.rounds[year].individualChoices || []),
                ...Object.keys(individualChoices),
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
    case SET_COLLECTIVE_CHOICES: {
      const { year, collectiveChoices } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          collectiveChoices: {
            ...state.entities.collectiveChoices,
            ...collectiveChoices,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              collectiveChoices: [
                ...(state.entities.rounds[year].collectiveChoices || []),
                ...Object.keys(collectiveChoices),
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
      const { yearFrom, yearTo } = action.payload;
      const currentCarbonVariables = state.entities.carbonVariables;
      const { participants } = state.result;

      const newCarbonVariables = {};
      participants.forEach((participantId) => {
        const yearParticipantKey = makeYearParticipantKey(
          yearFrom,
          participantId
        );
        const nextYearParticipantKey = makeYearParticipantKey(
          yearTo,
          participantId
        );
        const actionCardIds = pathOr(
          [],
          [
            'entities',
            'individualChoices',
            yearParticipantKey,
            'actionCardIds',
          ],
          state
        );
        const takenActionCards = actionCardIds.map(
          (actionId) => state.entities.actionCards[actionId]
        );
        newCarbonVariables[nextYearParticipantKey] = {
          participantId,
          variables: {
            ...currentCarbonVariables[yearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCarbonVariables[yearParticipantKey].variables,
              takenActionCards,
              state.entities.globalCarbonVariables[yearFrom]
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
            [yearTo]: { ...state.entities.globalCarbonVariables[yearFrom] },
          },
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              carbonVariables: state.result.participants.map((participantId) =>
                makeYearParticipantKey(yearTo, participantId)
              ),
            },
          },
        },
      };
    }
    case APPLY_COLLECTIVE_ACTIONS: {
      const { yearFrom, yearTo } = action.payload;
      const currentGlobalCarbonVariables = state.entities.globalCarbonVariables;
      const { participants } = state.result;

      const actionCardIds = pathOr(
        [],
        ['entities', 'collectiveChoices', yearFrom, 'actionCardIds'],
        state
      );

      const takenActionCardsThatApplyToEveryone = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.type === 'everyone');
      const newCarbonVariables = {};
      participants.forEach((participantId) => {
        const nextYearParticipantKey = makeYearParticipantKey(
          yearTo,
          participantId
        );
        const currentVariables = pathOr(
          {},
          ['entities', 'carbonVariables', nextYearParticipantKey, 'variables'],
          state
        );
        newCarbonVariables[nextYearParticipantKey] = {
          participantId,
          variables: {
            ...currentVariables,
            ...computeNewCarbonVariables(
              currentVariables,
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
            [yearTo]: {
              ...state.entities.globalCarbonVariables[yearFrom],
              ...computeNewCarbonVariables(
                currentGlobalCarbonVariables[yearFrom],
                takenActionCardsThatApplyGlobally
              ),
            },
          },
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              carbonVariables: state.result.participants.map((participantId) =>
                makeYearParticipantKey(yearTo, participantId)
              ),
              globalCarbonVariables: yearTo,
            },
          },
        },
      };
    }
    case APPLY_SOCIAL_IMPACT: {
      const { yearFrom, yearTo } = action.payload;
      const { actionCards } = state.entities;
      const currentSocialVariables =
        state.entities.rounds[yearFrom].socialVariables;

      const individualActionRecords =
        state.entities.rounds[yearFrom].individualActionCards || [];
      const individualActions = individualActionRecords.map(
        (yearParticipantKey) =>
          state.entities.individualActionCards[yearParticipantKey]
      );
      const collectiveActionCardIds = pathOr(
        [],
        ['entities', 'collectiveActionCards', yearFrom, 'actionCardIds'],
        state
      );
      const newSocialVariables = computeSocialVariables(
        currentSocialVariables,
        individualActions,
        collectiveActionCardIds,
        actionCards
      );
      const newBudget = computeBudget(newSocialVariables.influenceScore);
      console.log('newSocialVariables', newSocialVariables);
      console.log('newBudget', newBudget);
      return {
        ...state,
        entities: {
          ...state.entities,
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              socialVariables: newSocialVariables,
              budget: newBudget,
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
    case COMPUTE_FOOTPRINTS_FOR_CITIZENS: {
      const { year } = action.payload;
      const { citizenCarbonVariables, globalCarbonVariables } = state.entities;
      const { citizens } = state.result;
      const { footprintStructure, variableFormulas } = state.result.model;
      const newCitizenCarbonFootprints = {};
      citizens.forEach((citizenId) => {
        const yearParticipantKey = makeYearParticipantKey(year, citizenId);
        const citizenCarbonVariablesForParticipant =
          citizenCarbonVariables[yearParticipantKey].variables;
        const globalCarbonVariablesForYear = globalCarbonVariables[year];
        newCitizenCarbonFootprints[yearParticipantKey] = {
          ...newCitizenCarbonFootprints[yearParticipantKey],
          citizenId,
          footprint: valueOnAllLevels(
            computeFootprint(
              footprintStructure,
              variableFormulas,
              citizenCarbonVariablesForParticipant,
              globalCarbonVariablesForYear
            )
          ),
        };
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          citizenCarbonFootprints: {
            ...state.entities.citizenCarbonFootprints,
            ...newCitizenCarbonFootprints,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              citizenCarbonFootprints: state.result.citizens.map((citizenId) =>
                makeYearParticipantKey(year, citizenId)
              ),
            },
          },
        },
      };
    }
    case COMPUTE_CARBON_VARIABLES: {
      const { globalCarbonVariables } = state.result.model;
      const newParticipants = {};
      state.result.participants.forEach((participantId) => {
        const participant = state.entities.participants[participantId];
        newParticipants[participantId] = {
          ...participant,
          carbonVariables: computeCarbonVariables(
            participant.surveyVariables,
            globalCarbonVariables
          ),
        };
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          participants: newParticipants,
        },
      };
    }
    case SET_ACTIONS_FOR_CITIZENS: {
      const { year } = action.payload;
      const newCitizenIndividualActionCards = computeCitizenIndividualActionCards(
        year,
        state.entities.rounds[year].socialVariables,
        state.entities.citizenIndividualActionCards || {},
        state.result.citizens.map((id) => state.entities.citizens[id]),
        state.result.model.actionCards.map(
          (id) => state.entities.actionCards[id]
        )
      );
      return {
        ...state,
        entities: {
          ...state.entities,
          citizenIndividualActionCards: {
            ...state.entities.citizenIndividualActionCards,
            ...newCitizenIndividualActionCards,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              citizenIndividualActionCards: [
                ...(state.entities.rounds[year].citizenIndividualActionCards ||
                  []),
                ...Object.keys(newCitizenIndividualActionCards),
              ],
            },
          },
        },
      };
    }
    case APPLY_INDIVIDUAL_ACTIONS_FOR_CITIZENS: {
      const { yearFrom, yearTo } = action.payload;
      const currentCitizenCarbonVariables =
        state.entities.citizenCarbonVariables;
      const { citizens } = state.result;

      const newCarbonVariables = {};
      citizens.forEach((citizenId) => {
        const yearParticipantKey = makeYearParticipantKey(yearFrom, citizenId);
        const nextYearParticipantKey = makeYearParticipantKey(
          yearTo,
          citizenId
        );
        const actionCardIds = pathOr(
          [],
          [
            'entities',
            'citizenIndividualActionCards',
            yearParticipantKey,
            'actionCardIds',
          ],
          state
        );
        const takenActionCards = actionCardIds.map(
          (actionId) => state.entities.actionCards[actionId]
        );
        newCarbonVariables[nextYearParticipantKey] = {
          citizenId,
          variables: {
            ...currentCitizenCarbonVariables[yearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCitizenCarbonVariables[yearParticipantKey].variables,
              takenActionCards,
              state.entities.globalCarbonVariables[yearFrom]
            ),
          },
        };
      });
      return {
        ...state,
        entities: {
          ...state.entities,
          citizenCarbonVariables: {
            ...state.entities.citizenCarbonVariables,
            ...newCarbonVariables,
          },
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              citizenCarbonVariables: state.result.citizens.map((citizenId) =>
                makeYearParticipantKey(yearTo, citizenId)
              ),
            },
          },
        },
      };
    }
    case APPLY_COLLECTIVE_ACTIONS_FOR_CITIZENS: {
      const { yearFrom, yearTo } = action.payload;
      const currentCitizenCarbonVariables =
        state.entities.citizenCarbonVariables;
      const { citizens } = state.result;
      const actionCardIds = pathOr(
        [],
        ['entities', 'collectiveActionCards', yearFrom, 'actionCardIds'],
        state
      );

      const takenActionCardsThatApplyToEveryone = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.type === 'everyone');

      const newCitizenCarbonVariables = {};
      citizens.forEach((citizenId) => {
        const yearParticipantKey = makeYearParticipantKey(yearFrom, citizenId);
        const nextYearParticipantKey = makeYearParticipantKey(
          yearTo,
          citizenId
        );
        newCitizenCarbonVariables[nextYearParticipantKey] = {
          citizenId,
          variables: {
            ...currentCitizenCarbonVariables[yearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCitizenCarbonVariables[yearParticipantKey].variables,
              takenActionCardsThatApplyToEveryone
            ),
          },
        };
      });

      return {
        ...state,
        entities: {
          ...state.entities,
          citizenCarbonVariables: {
            ...state.entities.citizenCarbonVariables,
            ...newCitizenCarbonVariables,
          },
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              citizenCarbonVariables: state.result.citizens.map((citizenId) =>
                makeYearParticipantKey(yearTo, citizenId)
              ),
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
