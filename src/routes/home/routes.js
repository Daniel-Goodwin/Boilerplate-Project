import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';
import Layout, { CenterLayout, FullwidthLayout } from 'components/Layouts';
import GenericPartial from 'routes/home/partials/GenericPartial';

import Index from 'routes/home/views/Index';

export default (
  <Route components={{ layout: Layout, toolbar: GenericPartial }}>
    <Route component={CenterLayout}>
      <IndexRoute component={Index} />
    </Route>
  </Route>
);
