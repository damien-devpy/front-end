import { pathOr } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const selectUserId = (currentUser) =>
  pathOr(-1, ['user', 'id'], currentUser);

export const selectUser = (currentUser) => pathOr({}, ['user'], currentUser);
