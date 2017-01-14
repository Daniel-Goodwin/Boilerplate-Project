import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import window from './window';
import user from './user';
import customer from './customer';
import role from './role';

export default combineReducers({
  routing: routerReducer,
  customer,
  window,
  user,
  role,
});
