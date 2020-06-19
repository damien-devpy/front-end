export const ERROR = 'ERROR';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const throwError = (error) => ({
  type: ERROR,
  payload: { error },
});

export const resetError = () => ({
  type: RESET_ERROR_MESSAGE,
});
