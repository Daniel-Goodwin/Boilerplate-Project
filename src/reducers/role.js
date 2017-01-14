import * as syncTypes from 'actions/SyncActions';
import * as userTypes from 'actions/UserActions';

const initialState = {};

function role(state = initialState, action) {

  if (action.type === syncTypes.FIREBASE_SYNC_ROLE) {
    return action.role || {};
  }

  return state;
}

export default role;
