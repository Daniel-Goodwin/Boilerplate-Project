import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Layout, { CenterLayout, FullwidthLayout } from 'components/Layouts';
import Toolbar from 'routes/dashboard/partials/Toolbar';

import Overview from 'routes/dashboard/views/Overview';

export default (
  <Route components={{ layout: Layout, toolbar: Toolbar }}>
    <Route component={CenterLayout}>
      <IndexRoute component={Overview} />
      <Route path="dashboard/analytics" component={Overview} test='wef' />

      <Redirect to={'/'} from={'/dashboard'} />
    </Route>
  </Route>
);
