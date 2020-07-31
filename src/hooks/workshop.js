import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { getWorkshop } from '../utils/api';
import {
  retrieveWorkshop,
  workshopLoadError,
  workshopRetrieved,
} from '../actions/workshop';
import { selectCurrentWorkshop } from '../selectors/workshopSelector';

// eslint-disable-next-line import/prefer-default-export
export const useWorkshop = (workshopId) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const workshop = useSelector(selectCurrentWorkshop);
  useEffect(() => {
    if (!workshop || !workshop.result || workshop.result.id !== workshopId) {
      // eslint-disable-next-line no-console
      console.info(
        'Use case 1: No local workshop or local workshop id is different from the requested workshop id: Fetch the requested workshop'
      );
      const load = async () => {
        try {
          const result = await getWorkshop({ workshopId });
          if (mounted.current) {
            dispatch(workshopRetrieved(result));
          }
          return result;
        } catch (e) {
          if (mounted.current) {
            dispatch(workshopLoadError(e));
          }
          return null;
        }
      };
      mounted.current = true;
      dispatch(retrieveWorkshop());
      load();
    } else {
      // eslint-disable-next-line no-console
      console.info(
        'Use case 2: the local workshop id is equals to the requested workshop id. Just return'
      );
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, workshopId]);
  return workshop;
};
