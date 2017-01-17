import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import window from './window';
import user from './user';
import role from './role';

export default combineReducers({
  routing: routerReducer,
  window,
  user,
  role,
});
