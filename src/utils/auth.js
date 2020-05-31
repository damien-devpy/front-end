import jwtDecode from 'jwt-decode';

import getStorage from './storage';

const storage = getStorage();

export const getAccessToken = () => storage.getItem('2tons-token');

// returns true/false if token was set or already existing
export const setAccessToken = (token) => {
  const current = getAccessToken();
  if (token && current !== token) {
    storage.removeItem('2tons-token');
    storage.setItem('2tons-token', token);
    return true;
  }
  return false;
};

export const getAuthStatus = () => {
  try {
    const token = getAccessToken();
    const data = jwtDecode(token);
    return { data, isLoggedIn: true };
  } catch (err) {
    return {
      isLoggedIn: false,
    };
  }
};

export const logout = () => {
  window.postMessage({ type: '2tons::signedOut' }, '*');
  storage.clear();
};
