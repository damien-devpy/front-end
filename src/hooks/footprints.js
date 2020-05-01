import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  footprintsRetrieved,
  retrieveFootprints,
  footprintsLoadError,
} from '../actions/footprints';
import { getFootprints } from '../utils/api';

export const useFootprints = () => {
    const mounted = useRef(false);
    const dispatch = useDispatch();
    // const footprints = useSelector((state) => state.footprints);
    useEffect(() => {
      const load = async () => {
        try {
          const result = await getFootprints();
          mounted.current && dispatch(footprintsRetrieved(result));
          return result;
        } catch (e) {
          mounted.current && dispatch(footprintsLoadError(e));
        }
      };
      mounted.current = true;
      dispatch(retrieveFootprints());
      load();
  
      return () => {
        mounted.current = false;
      };
    }, [dispatch]);
    return coaches;
  };