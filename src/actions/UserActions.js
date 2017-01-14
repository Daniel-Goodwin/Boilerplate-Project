import firebase, { instances } from 'services/firebase';

export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_ADD_NEW = 'USER_ADD_NEW';

/**
 * @returns {function(*)}
 */
export function login() {
  return {
    type: USER_LOG_IN,
  };
}

/**
 *
 * @returns {function(*)}
 */
export function signOut() {
  return (dispatch) => {
    firebase.auth().signOut().then(() => {
      instances.authentication.auth().signOut();
      dispatch({
        type: USER_SIGN_OUT,
      });
    });
  }
}

/**
 * TODO Role...
 * @param id
 * @param email
 * @returns {function(*, *)}
 */
export function addUser(id, email) {
  return (dispatch, getState) => {
    const { user } = getState().user;

    firebase.database().ref(`users/${id}`).set({
      email,
      role: 1337,
    });

    dispatch({
      type: USER_ADD_NEW,
      id,
      email,
    });
  }
}
