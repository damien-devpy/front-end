import {
  __,
  append,
  gt,
  isEmpty,
  isNil,
  is as isType,
  join,
  mapObjIndexed,
  pipe,
  propSatisfies,
  take,
  when,
} from 'ramda';
import { format } from 'date-fns';

export const toggleArrayItem = (array = [], value) => {
  const [...newArray] = array;
  const i = newArray.indexOf(value);
  if (i === -1) newArray.push(value);
  else newArray.splice(i, 1);
  return newArray.sort();
};
export const toggleArrayItemInMap = (map, key, value) => ({
  ...map,
  [key]: toggleArrayItem(map[key], value),
});
export const truncate = (length) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe(take(length), append('…'), join(''))
  );

export const formatDate = (date, options = {}) => {
  const { formatString = 'dd/MM/yyyy' } = options;
  return format(new Date(date), formatString);
};

export const waitFor = (time = 0) =>
  new Promise((resolve) => setTimeout(time, resolve));

/* eslint-disable no-useless-escape */
export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
/* eslint-enable no-useless-escape */

export const randomIn = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const someIn = (array) =>
  array.slice(0, Math.ceil(Math.random() * array.length));

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const paramsToQuery = (params) => {
  const arr = [];
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      arr.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          isType(Array)(params[key]) ? `[${params[key]}]` : params[key]
        )}`
      );
    }
  });
  return arr.length > 0 ? `?${arr.join('&')}` : '';
};

export const queryToParams = (query) => {
  const urlParams = new URLSearchParams(query);
  const entries = urlParams.entries();
  const params = {};
  for (const pair of entries) {
    params[pair[0]] = pair[1];
  }
  return mapObjIndexed((val) => {
    if (isNil(val) || isEmpty(val)) {
      return '';
    }
    if (new RegExp(/^\[.*\]$/).test(val)) {
      return val
        .replace(/\[/, '')
        .replace(/\]/, '')
        .split(',')
        .filter((x) => !isNil(x) && !isEmpty(x) && x !== '');
    }
    if (!isNil(val) && !isEmpty(val)) {
      return val;
    }
    return undefined;
  }, params);
};

export const makeYearParticipantKey = (year, participantId) =>
  `${year}-${participantId}`;
