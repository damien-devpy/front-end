import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { getWorkshop } from '../utils/api';
import {
  retrieveWorkshop,
  workshopLoadError,
  workshopRetrieved,
} from '../actions/workshop';

// eslint-disable-next-line import/prefer-default-export
export const useWorkshop = (workshopId) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const workshop = useSelector((state) => state.workshop);
  useEffect(() => {
    // if (!workshop || !workshop.result || workshop.result.id !== workshopId) {
    const load = async () => {
      try {
        const result = await getWorkshop({ workshopId });
        mounted.current && dispatch(workshopRetrieved(result));
        return result;
      } catch (e) {
        mounted.current && dispatch(workshopLoadError(e));
      }
    };
    mounted.current = true;
    dispatch(retrieveWorkshop());
    load();
    // }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, workshopId]);
  return workshop;
};
