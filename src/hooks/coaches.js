import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  coachesRetrieved,
  retrieveCoaches,
  coachesLoadError
} from "../actions/coaches";
import { getCoaches } from "../utils/api";

export const useCoaches = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const coaches = useSelector(state => state.coaches);
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getCoaches();
        mounted.current && dispatch(coachesRetrieved(result));
        return result;
      } catch (e) {
        mounted.current && dispatch(coachesLoadError(e));
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
