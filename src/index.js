import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppContainer from 'containers/AppContainer';

import './base.css';
import App from './App';
import store from './store/setup';

import dashboard from 'routes/dashboard/routes';

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <Route component={App}>
          <Route component={AppContainer}>
            {dashboard}
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
