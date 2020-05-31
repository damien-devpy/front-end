import { combineReducers } from 'redux';

import coaches from './coaches';
import currentUser from './currentUser';
import participants from './participants';
import personas from './personas';
import workshop from './workshop';
import workshops from './workshops';

export default combineReducers({
  coaches,
  participants,
  personas,
  currentUser,
  workshop,
  workshops,
});
