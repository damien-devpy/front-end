import {
  INIT_FIRST_ROUND,
  INIT_NEXT_ROUND,
  SET_COLLECTIVE_ACTIONS,
  SET_INDIVIDUAL_ACTIONS,
} from '../actions/rounds';

const initialState = {
  byYear: { 2020: { 1: {} } },
  allYears: [1],
};

const initRoundObject = () => ({
  collectiveActionIds: [],
  participants: {},
  influenceScore: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_FIRST_ROUND: {
      const { year } = action.payload;
      return {
        byYear: {
          [year]: initRoundObject(),
        },
        allYears: [year],
      };
    }
    case INIT_NEXT_ROUND: {
      const { year } = action.payload;
      return state.allYears.includes(year)
        ? state
        : {
            byYear: { ...state.byYear, [year]: initRoundObject() },
            allYears: [...state.allYears, year],
          };
    }
    case SET_COLLECTIVE_ACTIONS: {
      const { year, collectiveActionIds } = action.payload;
      return !state.allYears.includes(year)
        ? state
        : {
            byYear: {
              ...state.byYear,
              [year]: {
                ...state.byYear[year],
                collectiveActionIds: [
                  ...new Set([
                    ...state.byYear[year]['collectiveActionIds'],
                    ...collectiveActionIds,
                  ]),
                ],
              },
            },
            allYears: [...state.allYears],
          };
    }
    case SET_INDIVIDUAL_ACTIONS:
      const { year, participantId, individualActionIds } = action.payload;
      return !state.allYears.includes(year)
        ? state
        : {
            byYear: {
              ...state.byYear,
              [year]: {
                ...state.byYear[year],
                participants: {
                  ...state.byYear[year]['participants'],
                  [participantId]: {
                    ...state.byYear[year]['participants'][participantId],
                    individualActionIds: [
                      ...new Set([
                        ...state.byYear[year]['participants'][participantId]
                          .individualActionIds,
                        ...individualActionIds,
                      ]),
                    ],
                  },
                },
              },
            },
            allYears: [...state.allYears],
          };
    default:
      return state;
  }
};
