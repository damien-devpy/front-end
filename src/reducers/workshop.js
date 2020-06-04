import {
  ADD_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANT_NAME_EMAIL,
} from '../actions/participants';
import {
  APPLY_COLLECTIVE_ACTIONS,
  APPLY_INDIVIDUAL_ACTIONS,
  COMPUTE_CARBON_VARIABLES,
  COMPUTE_FOOTPRINTS,
  INIT_ROUND,
  INIT_WORKSHOP,
  RETRIEVE_WORKSHOP,
  SET_COLLECTIVE_CHOICES,
  SET_INDIVIDUAL_CHOICES_FOR_ALL_PARTICIPANTS,
  START_ROUND,
  WORKSHOP_LOAD_ERROR,
  WORKSHOP_RETRIEVED,
} from '../actions/workshop';

import {
  computeFootprint,
  computeNewCarbonVariables,
  valueOnAllLevels,
} from './utils/model';
import { makeYearParticipantKey } from '../utils/helpers';
import computeCarbonVariables from './utils/bufferCarbonVariables';

export const MISSING_INFO = 'MISSING_INFO';
export const MUST_SEND_EMAIL = 'MUST_SEND_EMAIL';
export const EMAIL_SENT = 'EMAIL_SENT';
export const BILAN_RECEIVED = 'registered';

function computeStatus(valid, participant, newPersona) {
  let newStatus = null;
  if (!valid) {
    newStatus = MISSING_INFO;
  } else if (newPersona) {
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
          state.entities.individualChoices[yearParticipantKey] &&
          state.entities.individualChoices[yearParticipantKey].actionCardIds
            ? state.entities.individualChoices[yearParticipantKey].actionCardIds
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
              takenActionCards,
              state.entities.globalCarbonVariables[year]
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

      if (state.entities.collectiveChoices) {
        actionCardIds = state.entities.collectiveChoices[year]
          ? state.entities.collectiveChoices[year].actionCardIds
          : [];
      } else {
        actionCardIds = [];
      }

      const takenActionCardsThatApplyToEveryone = actionCardIds
        .map((actionId) => state.entities.actionCards[actionId])
        .filter((a) => a.type === 'everyone');
      const newCarbonVariables = {};
      participants.forEach((participantId) => {
        // const yearParticipantKey = makeYearParticipantKey(year, participantId);
        const nextYearParticipantKey = makeYearParticipantKey(
          nextYear,
          participantId
        );
        newCarbonVariables[nextYearParticipantKey] = {
          participantId,
          variables: {
            ...currentCarbonVariables[nextYearParticipantKey].variables,
            ...computeNewCarbonVariables(
              currentCarbonVariables[nextYearParticipantKey].variables,
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

    case ADD_PARTICIPANT: {
      console.log('Action ADD participant');
      const oldParticipants = state.entities.participants;
      const newId =
        Number(Object.keys(oldParticipants).sort().slice(-1)[0]) + 1;
      console.log(Object.keys(oldParticipants).sort()[-1], newId);

      const participants = {
        ...oldParticipants,
        [newId]: {
          id: newId,
          firstName: '',
          lastName: '',
          email: '',
          status: MISSING_INFO,
          isValid: false,
          linkBC: null,
          bilanCarbone: null,
        },
      };
      return {
        ...state,
        entities: { ...state.entities, participants },
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

    case SET_PARTICIPANT_NAME_EMAIL: {
      const { participantId, name, email, persona, valid } = action.payload;

      console.log(
        'Action set participant',
        participantId,
        name,
        email,
        persona,
        valid
      );
      let [firstName, ...lastName] = name.split(/ /);
      lastName = lastName.join(' ');

      const newPersona = persona || null;
      const newStatus = computeStatus(
        valid,
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
              firstName,
              lastName,
              email,
              isValid: valid,
              personaId: newPersona,
              status: newStatus,
            },
          },
        },
      };
      return newState;
    }

    default:
      return state;
  }
};
