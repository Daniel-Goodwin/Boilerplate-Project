import * as syncTypes from 'actions/SyncActions';
import * as userTypes from 'actions/UserActions';

const initialState = {
  isLoggedIn: null,
  uid: null,
  response: null,
};

function user(state = initialState, action) {

  if (action.type === syncTypes.FIREBASE_SYNC_USER_AUTH_STATE) {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn,
      uid: action.uid,
    }
  }

  if (action.type === syncTypes.FIREBASE_SYNC_USER) {
    return {
      ...state,
      response: action.user,
    }
  }

  if (action.type === syncTypes.FIREBASE_SYNC_CUSTOMER) {
    return {
      ...state,
      customer: action.customer,
    }
  }

  return state;
}

export default user;
