import handleFetch from "./handleFetch";
import { workshopSchema } from "../../normalizers";

export const getCoaches = () =>
  handleFetch(`/coaches`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });
export const getWorkshops = () =>
  handleFetch(`/workshops`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getFootprints = () =>
  handleFetch(`/footprints`, {
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });

export const getWorkshop = () =>
  handleFetch(`/workshop`, {
    normalizer: workshopSchema,
    useMock: true, // TO REMOVE AFTER BACKEND READY
  });
