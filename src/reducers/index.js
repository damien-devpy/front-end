import { combineReducers } from 'redux';
import coaches from './coaches';
import personas from './personas';
import workshop from './workshop';
import workshops from './workshops';

export default combineReducers({
  coaches,
  workshop,
  workshops,
  personas,
});
