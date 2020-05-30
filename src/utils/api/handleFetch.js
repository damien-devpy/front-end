import * as R from 'ramda';
import { normalize } from 'normalizr';
import wildstring from 'wildstring';

import { getAccessToken, getSessionId } from '../auth';
import { paramsToQuery } from '../helpers';
import getStorage from '../storage';
import mock from '../mock';

const storage = getStorage();

const buildHeaders = (forcedToken, customHeaders = {}) => {
  const token = getAccessToken();
  const headers = Object.assign(customHeaders, {
    Authorization: forcedToken || token,
  });
  return headers;
};

const handleHeaders = (response) => {
  const sessionId = response.headers.get('caplc-session-id');
  const current = storage.getItem('caplc-session-id');
  if (sessionId && current !== sessionId) {
    storage.removeItem('caplc-session-id');
    storage.setItem('caplc-session-id', sessionId);
  }
  return response;
};

const handleErrors = async (response) => {
  if (!response.ok) {
    const json = await response.json().catch(() => null);
    if (json) {
      const message = R.path(['error', 'message'], json);
      throw new Error(message || response.statusText);
    }
    throw new Error(response.statusText);
  }
  return response;
};

export default function handleFetch(url, options = {}) {
  const {
    method = 'GET',
    useMock,
    mockOptions = {},
    type = 'json',
    query,
    token,
    normalizer,
    ...rest
  } = options;
  if (method === 'GET' && query) {
    const queryparams = paramsToQuery(query);
    url += queryparams;
  }
  if (
    rest.body &&
    typeof rest.body !== 'string' &&
    !(rest.body instanceof FormData)
  ) {
    rest.body = JSON.stringify(rest.body);
  }
  if (useMock) {
    const matchingMockUrl = R.find((mockUrl) => wildstring.match(mockUrl, url))(
      R.keys(mock)
    );

    if (matchingMockUrl) {
      return new Promise((resolve) => {
        const result = R.is(Function)(mock[matchingMockUrl])
          ? mock[matchingMockUrl](mockOptions)
          : mock[matchingMockUrl];
        const normalizedResult = normalizer
          ? normalize(result, normalizer)
          : result;
        const timeout = setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(`mock`, {
            url: `/${method} ${url}`,
            params: mockOptions,
            data: normalizedResult,
          });
          resolve(normalizedResult);
          clearTimeout(timeout);
        }, 500);
      });
    }
  }
  const headers = buildHeaders(token, options.headers);
  const fetchOptions = {
    method,
    headers,
    ...rest,
  };
  return fetch(window.____.config.REACT_APP_API_BASE_URL + url, fetchOptions)
    .then(handleHeaders)
    .then(handleErrors)
    .then((response) => {
      switch (type) {
        case 'json':
          return response.json();
        case 'blob':
          return response.blob();
        case 'text':
          return response.text();
        case 'empty':
        default:
          return response;
      }
    });
}
