import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import window from './window';
export default combineReducers({
  routing: routerReducer,
  window,
});
