import actions from "./actions";
import coaches from "./coaches";
import participants from "./participants";
import years from "./years";
import workshop from './workshop';
import workshops from "./workshops";
import personas from "./personas"

import { combineReducers } from "redux";

export default combineReducers({
  actions,
  coaches,  
  years,
  participants,
  workshop,
  workshops,
  personas,
});
