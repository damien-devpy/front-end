import { combineReducers } from "redux";
import actions from "./actions";
import coaches from "./coaches";
import participants from "./participants";
import rounds from "./rounds";
import years from "./years";
import workshops from "./workshops";
import personas from "./personas"

export default combineReducers({
  actions,
  coaches,
  participants,
  rounds,
  years,
  workshops,
  personas,
});
