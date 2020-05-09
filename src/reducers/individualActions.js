import {
  INIT_INDIVIDUAL_ACTIONS,
  SET_INDIVIDUAL_ACTIONS,
} from '../actions/individualActions';

const initialState = {
  byParticipantIds: { 1: { 1: [2020], 2: [2020], 3: [0], 4: [0] } },
  allParticipantIds: [1],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_INDIVIDUAL_ACTIONS: {
      const { participants, actions } = action.payload;
      const initAllActionsWithYearZero = Object.keys(actions).reduce(
        (accumulator, actionCardId) => ({ ...accumulator, [actionCardId]: 0 }),
        {}
      );
      const initAllParticipantsWithAllActionsWithYearZero = Object.keys(
        participants
      ).reduce(
        (accumulator, participantId) => ({
          ...accumulator,
          [participantId]: { ...initAllActionsWithYearZero },
        }),
        {}
      );

      return {
        allParticipantIds: Object.keys(participants).map((participantId) =>
          parseInt(participantId)
        ),
        byParticipantIds: initAllParticipantsWithAllActionsWithYearZero,
      };
    }
    // case SET_ACTIONS: {
    //   const { participantId, year, actionIds } = action.payload;
    //   return {
    //     ...state,
    //     allParticipantIds: state.allParticipantIds.includes(participantId)
    //       ? [...state.allParticipantIds]
    //       : [...state.allParticipantIds, participantId],
    //     byParticipantIds: {
    //       ...state.byParticipantIds,
    //       [participantId]: {
    //         ...state[participantId],
    //         [year]:
    //           state.byParticipantIds[participantId] && state.byParticipantIds[participantId][year]
    //             ? [...state.byParticipantIds[participantId][year], ...actionIds].reduce(
    //                 (unique, item) =>
    //                   unique.includes(item) ? unique : [...unique, item],
    //                 []
    //               )
    //             : [...actionIds].reduce(
    //                 (unique, item) =>
    //                   unique.includes(item) ? unique : [...unique, item],
    //                 []
    //               )
    //       }
    //     }
    //   };
    // }
    case SET_INDIVIDUAL_ACTIONS: {
      const { participantId, year, actionCardIds } = action.payload;

      const newState = {
        ...state,
        allParticipantIds: state.allParticipantIds.includes(participantId)
          ? [...state.allParticipantIds]
          : [...state.allParticipantIds, participantId],
        byParticipantIds: {
          ...state.byParticipantIds,
          [participantId]: {
            ...state.byParticipantIds[participantId],
            ...actionCardIds.reduce(
              (accumulator, actionCardId) => ({
                ...accumulator,
                [actionCardId]: year,
              }),
              {}
            ),
          },
        },
      };
      return newState;
    }
    default:
      return state;
  }
};
