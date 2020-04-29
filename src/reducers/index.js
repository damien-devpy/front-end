import { combineReducers } from 'redux';
//import actions from './actions';
import coaches from './coaches';
import participants from './participants';
import workshop from './workshop';
//import years from './years';

export default combineReducers({
  //actions,
  coaches,
  participants,
  workshop,
  //years,
});
