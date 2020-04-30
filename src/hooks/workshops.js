import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  workshopsRetrieved,
  retrieveWorkshops,
  workshopsLoadError
} from "../actions/workshops";
import { getWorkshops } from "../utils/api";

export const useWorkshops = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  let workshops = useSelector(state => state.workshops);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getWorkshops();
        mounted.current && dispatch(workshopsRetrieved(result));
        return workshops;
      } catch (e) {
        mounted.current && dispatch(workshopsLoadError(e));
      }
    };
    mounted.current = true;
    dispatch(retrieveWorkshops());
    load();

    return () => {
      mounted.current = false;
    };
  }, [dispatch]);

  return workshops;
};
