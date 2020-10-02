import * as R from 'ramda';
import JSZip from 'jszip';
import wildstring from 'wildstring';
import { normalize } from 'normalizr';

import mock from '../mock';
import { getAccessToken } from '../auth';
import { paramsToQuery } from '../helpers';

export const API_BASE_URL = 'https://api-preprod.2tonnes.org/api/v1';

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

  const getContentEncodingHeaderValue = (response) =>
    R.pathOr('', ['headers', 'Content-Encoding'], response);

  const zipBodyIfNeededPromise = (body) => {
    const zip = new JSZip();
    zip.file('body', body);
    return zip.generateAsync({ type: 'blob' });
  };

  return fetch(`${API_BASE_URL}${url}`, fetchOptions)
    .then(handleErrors)
    .then((response) => {
      console.log('fetch response ', response);
      const contentEncodingValue = getContentEncodingHeaderValue(response);
      console.log(
        'fetch response headers Content-Encoding',
        contentEncodingValue
      );
      if (contentEncodingValue === 'gzip') {
        // eslint-disable-next-line no-console
        console.log(
          'fetch response headers contains Content-Encoding with gzip'
        );
        return response.blob().then((data) => JSZip.loadAsync(data));
      }
      return new Promise((resolve) => resolve(response));
    })
    .then((response) => {
      switch (type) {
        case 'json':
          return response
            .json()
            .then((data) => (normalizer ? normalize(data, normalizer) : data))
            .catch((e) => console.error(e));
        case 'blob':
          return response.blob().catch((e) => console.error(e));
        case 'text':
          return response.text().catch((e) => console.error(e));
        case 'empty':
        default:
          return response;
      }
    });
}
