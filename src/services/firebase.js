import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';

const config = require('../../firebase.json');

export const instances = {
  authentication: firebase.initializeApp(config, 'authentication'),
};

export const createInstance = (config, instance) => {
  if (instance === 'authentication') {
    console.warn('Unable to create instance. "authentication" is a reserved instance name.');
    return;
  }
  instances[instance] = firebase.initializeApp(config, instance);
};

export default firebase.initializeApp(config, 'default');
