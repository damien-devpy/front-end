import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import {
  coachesLoadError,
  coachesRetrieved,
  retrieveCoaches,
} from '../actions/coaches';
import { getCoaches } from '../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const useCoaches = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const coaches = useSelector((state) => state.coaches);
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getCoaches();
        console.log('useCoaches', coaches);

        if (mounted.current) {
          dispatch(coachesRetrieved(result));
        }
        return result;
      } catch (e) {
        if (mounted.current) {
          dispatch(coachesLoadError(e));
        }
      }
    };
    mounted.current = true;
    dispatch(retrieveCoaches());
    load();

    return () => {
      mounted.current = false;
    };
  }, [dispatch]);
  return coaches;
};
