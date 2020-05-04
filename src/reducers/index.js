import actions from './actions';
import coaches from './coaches';
import participants from './participants';
import workshop from './workshop';
import workshops from './workshops';
import years from './years';
import { combineReducers } from 'redux';

export default combineReducers({
    actions, 
    coaches, 
    years, 
    participants, 
    workshop, 
    workshops
  }
);
