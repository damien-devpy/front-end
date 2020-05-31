import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import {
  currentUserLoadError,
  currentUserRetrieved,
  retrieveCurrentUser,
} from '../actions/user';
import { login } from '../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const useUser = (credentials) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await login(credentials);

        if (mounted.current) {
          dispatch(currentUserRetrieved(result));
        }
        return result;
      } catch (e) {
        if (mounted.current) {
          dispatch(currentUserLoadError(e));
        }
      }
    };
    mounted.current = true;
    dispatch(retrieveCurrentUser());
    load();

    return () => {
      mounted.current = false;
    };
  }, [credentials, dispatch]);
  return user;
};
