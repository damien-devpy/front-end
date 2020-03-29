export const INIT_INDIVIDUAL_ACTIONS = 'INIT_INDIVIDUAL_ACTIONS';
export const SET_INDIVIDUAL_ACTIONS = 'SET_INDIVIDUAL_ACTIONS';

export const initActions = (actions, participants) => ({
  type: INIT_INDIVIDUAL_ACTIONS,
  payload: { actions, participants }
});

export const setActions = (participantId, year, actionIds) => ({
  type: SET_INDIVIDUAL_ACTIONS,
  payload: { participantId, year, actionIds }
});
