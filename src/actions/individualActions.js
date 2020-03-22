export const INIT_ACTIONS = 'INIT_ACTIONS';
export const SET_ACTIONS = 'SET_ACTIONS';

export const initActions = (actions, participants) => ({
  type: INIT_ACTIONS,
  payload: { actions, participants }
});

export const setActions = (participantId, year, actionIds) => ({
  type: SET_ACTIONS,
  payload: { participantId, year, actionIds }
});
