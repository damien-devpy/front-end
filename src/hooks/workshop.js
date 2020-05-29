import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  workshopRetrieved,
  retrieveWorkshop,
  workshopLoadError,
} from "../actions/workshop";
import { getWorkshop } from "../utils/api";

export const useWorkshop = (workshopId) => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const workshop = useSelector((state) => state.workshop);
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getWorkshop(workshopId);
        mounted.current && dispatch(workshopRetrieved(result));
        return result;
      } catch (e) {
        mounted.current && dispatch(workshopLoadError(e));
      }
    };
    mounted.current = true;
    dispatch(retrieveWorkshop());
    load();
    return () => {
      mounted.current = false;
    };
  }, [dispatch, workshopId]);
  return workshop;
};
