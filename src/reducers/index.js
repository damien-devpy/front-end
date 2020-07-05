import { combineReducers } from 'redux';

import coaches from './coaches';
import currentUser from './currentUser';
import error from './errors';
import workshop from './workshop';
import workshops from './workshops';

export default combineReducers({
  coaches,
  currentUser,
  error,
  workshop,
  workshops,
});
