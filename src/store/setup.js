import { createStore, applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from 'reducers';

const logger = reduxLogger({
  predicate: () => process.env.NODE_ENV === 'development',
  collapsed: true,
  duration: true,
});

const middlewares = [];

middlewares.push(applyMiddleware(...[thunk, logger, routerMiddleware(browserHistory)]));

export default createStore(reducers, {}, compose(...middlewares));
