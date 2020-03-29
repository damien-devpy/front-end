import {
  INIT_INDIVIDUAL_ACTIONS,
  SET_INDIVIDUAL_ACTIONS
} from '../actions/individualActions';

const initialState = {
  byParticipantIds: { 1: { 1: 2020, 2: 2020, 3: 0, 4: 0 } },
  allParticipantIds: [1]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_INDIVIDUAL_ACTIONS: {
      const { participants, actions } = action.payload;
      const initAllActionsWithYearZero = Object.keys(actions).reduce(
        (accumulator, actionId) => ({ ...accumulator, [actionId]: 0 }),
        {}
      );
      //console.log('initAllActionsWithYearZero', initAllActionsWithYearZero);
      const initAllParticipantsWithAllActionsWithYearZero = Object.keys(
        participants
      ).reduce(
        (accumulator, participantId) => ({
          ...accumulator,
          [participantId]: { ...initAllActionsWithYearZero }
        }),
        {}
      );
      // console.log(
      //   'initAllParticipantsWithAllActionsWithYearZero',
      //   initAllParticipantsWithAllActionsWithYearZero
      // );

      return {
        allParticipantIds: Object.keys(participants).map(participantId =>
          parseInt(participantId)
        ),
        byParticipantIds: initAllParticipantsWithAllActionsWithYearZero
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
      const { participantId, year, actionIds } = action.payload;
      //console.log('actionsWithYearObject', actionsWithYearObject);
      //console.log('oldState', state);
      //console.log('...state.byParticipantIds', { ...state.byParticipantIds });
      //console.log('...state[participantId]', { ...state.byParticipantIds[participantId] });

      const newState = {
        ...state,
        allParticipantIds: state.allParticipantIds.includes(participantId)
          ? [...state.allParticipantIds]
          : [...state.allParticipantIds, participantId],
        byParticipantIds: {
          ...state.byParticipantIds,
          [participantId]: {
            ...state.byParticipantIds[participantId],
            ...actionIds.reduce(
              (accumulator, actionId) => ({ ...accumulator, [actionId]: year }),
              {}
            )
          }
        }
      };
      //console.log('newState', newState);
      return newState;
    }
    default:
      return state;
  }
};
