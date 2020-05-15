import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  participantsRetrieved,
  retrieveParticipants,
  participantsLoadError
} from "../actions/participants";
import { getParticipants } from "../utils/api";

export const useParticipants = () => {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  let participants = useSelector(state => state.participants);
  
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getParticipants();
        mounted.current && dispatch(participantsRetrieved(result));
        console.log("Result", result)
        return participants;      
      } catch (e) {
        mounted.current && dispatch(participantsLoadError(e));
      }
    };
    mounted.current = true;
    dispatch(retrieveParticipants());
    load();

    return () => {
      mounted.current = false;
    };
  }, [dispatch]);

  return participants;
};
