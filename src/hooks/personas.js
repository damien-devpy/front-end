import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  personasRetrieved,
  retrievePersonas,
  personasLoadError
} from "../actions/personas";
import { getPersonas } from "../utils/api";

export const usePersonas = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  let personas = useSelector(state => state.personas);
  
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getPersonas();
        mounted.current && dispatch(personasRetrieved(result));
        console.log("Result", result)
        return personas;      
      } catch (e) {
        mounted.current && dispatch(personasLoadError(e));
      }
    };
    mounted.current = true;
    dispatch(retrievePersonas());
    load();

    return () => {
      mounted.current = false;
    };
  }, [dispatch]);

  return personas;
};
