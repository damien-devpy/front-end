export const INIT_FIRST_ROUND = 'INIT_FIRST_ROUND';
export const INIT_NEXT_ROUND = 'INIT_NEXT_ROUND';
export const SET_INDIVIDUAL_ACTIONS = 'SET_INDIVIDUAL_ACTIONS';
export const SET_COLLECTIVE_ACTIONS = 'SET_COLLECTIVE_ACTIONS';

export const initFirstRound = (year) => ({
  type: INIT_FIRST_ROUND,
  payload: { year },
});

export const initNextRound = (year) => ({
  type: INIT_NEXT_ROUND,
  payload: { year },
});

export const setIndividualActions = (
  year,
  participantId,
  individualActionIds
) => ({
  type: SET_INDIVIDUAL_ACTIONS,
  payload: { year, participantId, individualActionIds },
});

export const setCollectiveActions = (year, collectiveActionIds) => ({
  type: SET_COLLECTIVE_ACTIONS,
  payload: { year, collectiveActionIds },
});
