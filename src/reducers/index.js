import { combineReducers } from "redux";
import actions from "./actions";
import coaches from "./coaches";
import participants from "./participants";
import years from "./years";
import workshops from "./workshops";
import personas from "./personas"

export default combineReducers({
  actions,
  coaches,
  participants,
  years,
  workshops,
  personas,
});
