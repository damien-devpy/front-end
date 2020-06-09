import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import {
  authenticateCurrentUser,
  currentUserLoadError,
  currentUserRetrieved,
} from '../actions/user';
import { getCurrentUser } from '../utils/api';
import { setAccessToken } from '../utils/auth';

// eslint-disable-next-line import/prefer-default-export
export const useAuthentication = (token) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    const load = async () => {
      try {
        setAccessToken(token);
        const result = await getCurrentUser(token);
        if (mounted.current) {
          dispatch(currentUserRetrieved(result));
        }
        return result;
      } catch (e) {
        if (mounted.current) {
          dispatch(currentUserLoadError(e));
        }
        return {};
      }
    };
    mounted.current = true;
    dispatch(authenticateCurrentUser());
    load(token);

    return () => {
      mounted.current = false;
    };
  }, [token, dispatch]);
  return user;
};
