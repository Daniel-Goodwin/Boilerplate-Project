import firebase, { instances, createInstance } from 'services/firebase';

export const FIREBASE_SYNC_CONFIG = 'FIREBASE_SYNC_CONFIG';
export const FIREBASE_SYNC_USER_AUTH_STATE = 'FIREBASE_SYNC_USER_AUTH_STATE';
export const FIREBASE_SYNC_USER = 'FIREBASE_SYNC_USER';
export const FIREBASE_SYNC_ROLE = 'FIREBASE_SYNC_ROLE';

/**
 * Sync config updates to redux
 * @returns {function(*)}
 */
export function syncConfig(config) {
  return {
    type: FIREBASE_SYNC_CONFIG,
    config: config || {},
  };
}

/**
 * @returns {function(*)}
 */
export function syncUserAuthState() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch({
        type: FIREBASE_SYNC_USER_AUTH_STATE,
        isLoggedIn: !!user,
        uid: user ? user.uid : null,
      });
    });
  };
}

/**
 * @returns {function(*)}
 */
export function syncUser(id) {
  return (dispatch) => {
    firebase.database().ref(`users/${id}`).on('value', (snapshot) => {
      dispatch({
        type: FIREBASE_SYNC_USER,
        user: snapshot.val(),
      });
    });
  };
}

let roleRef = null;

/**
 * @returns {function(*)}
 */
export function syncRole(id) {
  return (dispatch) => {
    firebase.database().ref(`users/${id}/role`).on('value', (snapshot) => {

      if (roleRef) {
        roleRef.off('value');
      }

      roleRef = firebase.database().ref(`roles/${snapshot.val()}`);
      roleRef.on('value', (snapshot) => {
        dispatch({
          type: FIREBASE_SYNC_ROLE,
          role: snapshot.val(),
        });
      });
    });
  };
}
