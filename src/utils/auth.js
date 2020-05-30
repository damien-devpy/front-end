import authentication from '@yoss-org/react-azure-adb2c';
import jwtDecode from 'jwt-decode';

import getStorage from './storage';

const storage = getStorage();

export const getAccessToken = () => storage.getItem('yoss-token');
export const getSessionId = () => storage.getItem('yoss-session-id');

// returns true/false if token was set or already existing
export const setAccessToken = (token) => {
  const current = getAccessToken();
  if (token && current !== token) {
    storage.removeItem('yoss-token');
    storage.setItem('yoss-token', token);
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
  window.postMessage({ type: 'yoss::signedOut' }, '*');
  storage.clear();
  authentication.signOut();
};
