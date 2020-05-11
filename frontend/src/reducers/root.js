import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import trips from './trips';

export default combineReducers({
  tripsReducer: trips,
  authReducer: auth,
  messagesReducer: messages,
});
