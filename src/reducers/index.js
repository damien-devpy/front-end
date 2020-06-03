import { combineReducers } from 'redux';

import coaches from './coaches';
import currentUser from './currentUser';
import personas from './personas';
import workshop from './workshop';
import workshops from './workshops';

export default combineReducers({
  coaches,
  currentUser,
  personas,
  workshop,
  workshops,
});
