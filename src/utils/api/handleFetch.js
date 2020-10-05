import * as R from 'ramda';
import wildstring from 'wildstring';
import { normalize } from 'normalizr';

import mock from '../mock';
import { getAccessToken } from '../auth';
import { paramsToQuery } from '../helpers';

export const { REACT_APP_API_URL } = process.env;

const buildHeaders = (forcedToken, customHeaders = {}) => {
  const token = getAccessToken();
  const headers = Object.assign(customHeaders, {
    Authorization: `Bearer ${forcedToken || token}`,
  });
  return headers;
};

const handleErrors = async (response) => {
  if (!response.ok) {
    const json = await response.json().catch(() => null);
    if (json) {
      const message = R.path(['msg'], json);
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
  const urlWithQueryParams =
    method === 'GET' && query ? `${url}${paramsToQuery(query)}` : url;
  if (
    rest.body &&
    typeof rest.body !== 'string' &&
    !(rest.body instanceof FormData)
  ) {
    rest.body = JSON.stringify(rest.body);
  }
  if (useMock) {
    const matchingMockUrl = R.find((mockUrl) =>
      wildstring.match(mockUrl, urlWithQueryParams)
    )(R.keys(mock));

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
            url: `/${method} ${urlWithQueryParams}`,
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

  return fetch(`${REACT_APP_API_URL}${urlWithQueryParams}`, fetchOptions)
    .then(handleErrors)
    .then((response) => {
      switch (type) {
        case 'json':
          return (
            response
              .json()
              .then((data) => (normalizer ? normalize(data, normalizer) : data))
              // eslint-disable-next-line no-console
              .catch((e) => console.error(e))
          );
        case 'blob':
          // eslint-disable-next-line no-console
          return response.blob().catch((e) => console.error(e));
        case 'text':
          // eslint-disable-next-line no-console
          return response.text().catch((e) => console.error(e));
        case 'empty':
        default:
          return response;
      }
    });
}
