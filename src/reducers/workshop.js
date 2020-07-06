import { pathOr } from 'ramda';

import computeCarbonVariables from './utils/bufferCarbonVariables';
import {
  ADD_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANT_PERSONA,
} from '../actions/participants';
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
  PERSIST_WORKSHOP,
  RETRIEVE_WORKSHOP,
  SET_ACTIONS_FOR_CITIZENS,
  SET_COLLECTIVE_CHOICES,
  SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS,
  START_ROUND,
  WORKSHOP_LOAD_ERROR,
  WORKSHOP_PERSISTED,
  WORKSHOP_RETRIEVED,
} from '../actions/workshop';
import {
  computeBudget,
  computeCitizenIndividualChoices,
  computeFootprint,
  computeNewCarbonVariables,
  computeSocialVariables,
  valueOnAllLevels,
} from './utils/model';
import { generateDefautActionCardBatchesEntity } from './utils/actionCardBatchesGenerator';
import { makeYearParticipantKey } from '../utils/helpers';

export const MISSING_INFO = 'MISSING_INFO';
export const MUST_SEND_EMAIL = 'created';
export const EMAIL_SENT = 'EMAIL_SENT';
export const BILAN_RECEIVED = 'registered';

function computeStatus(participant, newPersona) {
  let newStatus = null;
  if (newPersona) {
    newStatus = BILAN_RECEIVED;
  } else {
    switch (
      participant.status // old status
    ) {
      case MISSING_INFO: {
        newStatus = MUST_SEND_EMAIL;
        break;
      }
      default: {
        if (participant.bilanCarbone) {
          newStatus = BILAN_RECEIVED;
        } else if (participant.linkBC) {
          newStatus = EMAIL_SENT;
        } else {
          newStatus = MUST_SEND_EMAIL;
        }
      }
    }
  }
  return newStatus;
}

const initialState = {
  isLoading: false,
  loadError: false,
  loadErrorDetails: null,
  isSynchronized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_WORKSHOP: {
      return {
        isLoading: true,
        loadError: false,
        loadErrorDetails: null,
      };
    }
    case WORKSHOP_RETRIEVED: {
      const { workshop } = action.payload;
      const normalizedWorkshop = { ...workshop };
      if (!normalizedWorkshop.entities.actionCardBatches) {
        normalizedWorkshop.entities.actionCardBatches = generateDefautActionCardBatchesEntity(
          normalizedWorkshop.entities.actionCards
        );
      }
      return {
        isLoading: false,
        loadError: false,
        loadErrorDetails: null,
        isSynchronized: true,
        ...normalizedWorkshop,
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
    case PERSIST_WORKSHOP: {
      return {
        ...state,
        isSynchronized: false,
      };
    }
    case WORKSHOP_PERSISTED: {
      return {
        ...state,
        isSynchronized: true,
      };
    }
    case INIT_WORKSHOP: {
      const { year, heatingNetworksData } = action.payload;
      const participantIds = state.result.participants;
      const citizenIds = state.result.model.personas;

      return {
        ...state,
        entities: {
          ...state.entities,
          rounds: {
            ...state.entities.rounds,
            [year]: {
              year,
              carbonVariables: participantIds.map((id) =>
                makeYearParticipantKey(year, id)
              ),
              citizenCarbonVariables: citizenIds.map((id) =>
                makeYearParticipantKey(year, id)
              ),
              roundConfig: year,
              globalCarbonVariables: year,
              socialVariables: {
                socialScore: 0,
                influenceScore: 0,
              },
            },
          },
          carbonVariables: {
            ...(state.entities.carbonVariables || {}),
            ...Object.keys(state.entities.participants).reduce(
              (o, participantId) => ({
                ...o,
                [makeYearParticipantKey(year, participantId)]: {
                  participantId,
                  variables: computeCarbonVariables(
                    state.entities.participants[participantId].surveyVariables,
                    state.result.model.globalCarbonVariables,
                    heatingNetworksData
                  ),
                },
              }),
              {}
            ),
          },
          citizenCarbonVariables: {
            ...(state.entities.citizenCarbonVariables || {}),
            ...citizenIds.reduce(
              (o, citizenId) => ({
                ...o,
                [makeYearParticipantKey(year, citizenId)]: {
                  citizenId,
                  variables: computeCarbonVariables(
                    state.entities.personas[citizenId].surveyVariables,
                    state.result.model.globalCarbonVariables,
                    heatingNetworksData
                  ),
                },
              }),
              {}
            ),
          },
          globalCarbonVariables: {
            [year]: { ...state.result.model.globalCarbonVariables },
          },
          citizens: { ...state.entities.personas },
        },
        result: {
          ...state.result,
          rounds: [year],
          currentYear: year,
          citizens: state.result.model.personas.map((persona) => persona),
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
        result: {
          ...state.result,
          rounds: [...state.result.rounds, year],
        },
      };
    }
    case START_ROUND: {
      const {
        actionCardType,
        currentYear,
        targetedYear,
        individualBudget,
        actionCardBatchIds,
      } = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          roundConfig: {
            ...state.entities.roundConfig,
            [currentYear]: {
              actionCardType,
              targetedYear,
              individualBudget,
              actionCardBatchIds,
            },
          },
          rounds: {
            ...state.entities.rounds,
            [currentYear]: {
              ...state.entities.rounds[currentYear],
              roundConfig: currentYear,
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
          currentYear: state.entities.roundConfig[year].targetedYear,
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
              collectiveChoices: year,
            },
          },
        },
        result: {
          ...state.result,
          currentYear: state.entities.roundConfig[year].targetedYear,
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
        .filter((a) => a.impactType === 'everyone');
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
        .filter((a) => a.impactType === 'global');

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
        ['entities', 'collectionChoices', yearFrom, 'actionCardIds'],
        state
      );
      const newSocialVariables = computeSocialVariables(
        currentSocialVariables,
        individualActions,
        collectiveActionCardIds,
        actionCards
      );
      const newBudget = computeBudget(newSocialVariables.influenceScore);
      return {
        ...state,
        entities: {
          ...state.entities,
          rounds: {
            ...state.entities.rounds,
            [yearTo]: {
              ...state.entities.rounds[yearTo],
              socialVariables: newSocialVariables,
              collectiveBudget: newBudget,
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
      const { heatingNetworksData } = action.payload;
      const { globalCarbonVariables } = state.result.model;
      const newParticipants = {};
      state.result.participants.forEach((participantId) => {
        const participant = state.entities.participants[participantId];
        newParticipants[participantId] = {
          ...participant,
          carbonVariables: computeCarbonVariables(
            participant.surveyVariables,
            globalCarbonVariables,
            heatingNetworksData
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
      const newCitizenIndividualChoices = computeCitizenIndividualChoices(
        year,
        state.entities.rounds[year].socialVariables,
        state.entities.citizenIndividualChoices || {},
        state.result.citizens.map((id) => state.entities.citizens[id]),
        state.result.model.actionCards.map(
          (id) => state.entities.actionCards[id]
        )
      );
      return {
        ...state,
        entities: {
          ...state.entities,
          citizenIndividualChoices: {
            ...state.entities.citizenIndividualChoices,
            ...newCitizenIndividualChoices,
          },
          rounds: {
            ...state.entities.rounds,
            [year]: {
              ...state.entities.rounds[year],
              citizenIndividualChoices: [
                ...(state.entities.rounds[year].citizenIndividualChoices || []),
                ...Object.keys(newCitizenIndividualChoices),
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
            'citizenIndividualChoices',
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
        ['entities', 'collectiveChoices', yearFrom, 'actionCardIds'],
        state
      );

      const takenActionCardsThatApplyToEveryone = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.impactType === 'everyone');

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
    case DELETE_PARTICIPANT: {
      console.log('Action DELETE participant');
      const { id } = action.payload;
      const oldParticipants = state.entities.participants;
      const participants = Object.keys(oldParticipants).reduce(
        (filtered, i) => {
          if (i !== id) filtered[i] = oldParticipants[i];
          return filtered;
        },
        {}
      );
      // console.log(Object.keys(state.entities.participants), participants)
      return {
        ...state,
        entities: {
          ...state.entities,
          participants,
        },
      };
    }

    case SET_PARTICIPANT_PERSONA: {
      const { participantId, persona } = action.payload;

      console.log('Action set participant', participantId, persona);

      // todo remove when handled by back
      const newPersona = persona || null;
      const newStatus = computeStatus(
        state.entities.participants[participantId],
        newPersona
      );

      const newState = {
        ...state,
        entities: {
          ...state.entities,
          participants: {
            ...state.entities.participants,
            [participantId]: {
              ...state.entities.participants[participantId],
              personaId: newPersona,
              status: newStatus,
              surveyVariables: newPersona
                ? state.entities.personas[newPersona].surveyVariables
                : state.entities.participants[participantId].surveyVariables,
            },
          },
        },
      };
      return newState;
    }

    case ADD_PARTICIPANT: {
      const { participant } = action.payload;
      const oldParticipants = pathOr([], ['entities', 'participants'], state);
      const participants = {
        ...oldParticipants,
        [participant.id]: participant,
      };
      return {
        ...state,
        entities: { ...state.entities, participants },
        result: {
          ...state.result,
          participants: [...state.result.participants, participant.id],
        },
      };
    }

    default:
      return state;
  }
};
