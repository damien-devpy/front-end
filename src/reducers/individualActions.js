import { INIT_ACTIONS, SET_ACTIONS } from '../actions/individualActions';

const initialState = {
  byIds: {},
  allIds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_ACTIONS: {
      const { participants, actions } = action.payload;
      const initAllActionsWithYearZero = Object.keys(actions).reduce(
        (accumulator, actionId) => ({ ...accumulator, [actionId]: 0 }),
        {}
      );
      console.log('initAllActionsWithYearZero', initAllActionsWithYearZero);
      const initAllParticipantsWithAllActionsWithYearZero = Object.keys(
        participants
      ).reduce(
        (accumulator, participantId) => ({
          ...accumulator,
          [participantId]: { ...initAllActionsWithYearZero }
        }),
        {}
      );
      console.log(
        'initAllParticipantsWithAllActionsWithYearZero',
        initAllParticipantsWithAllActionsWithYearZero
      );

      return initAllParticipantsWithAllActionsWithYearZero;
    }
    case SET_ACTIONS: {
      const { participantId, year, actionIds } = action.payload;
      return {
        ...state,
        allIds: state.allIds.includes(participantId)
          ? [...state.allIds]
          : [...state.allIds, participantId],
        byIds: {
          ...state.byIds,
          [participantId]: {
            ...state[participantId],
            [year]:
              state.byIds[participantId] && state.byIds[participantId][year]
                ? [...state.byIds[participantId][year], ...actionIds].reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    []
                  )
                : [...actionIds].reduce(
                    (unique, item) =>
                      unique.includes(item) ? unique : [...unique, item],
                    []
                  )
          }
        }
      };
    }
    default:
      return state;
  }
};
