import { combineReducers } from 'redux';
import actions from './actions';
import individualActions from './individualActions';
import participants from './participants';
import years from './years';

export default combineReducers({
  actions,
  individualActions,
  participants,
  years
});
