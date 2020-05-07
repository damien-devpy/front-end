import { combineReducers } from 'redux';
import coaches from './coaches';
import participants from './participants';
import workshop from './workshop';
import workshops from './workshops';

export default combineReducers({
  coaches,
  participants,
  workshop,
  workshops,
});
