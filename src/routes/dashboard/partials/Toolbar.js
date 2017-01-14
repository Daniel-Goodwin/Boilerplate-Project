import React from 'react';
import NavTabs, { Tab } from 'components/NavTabs';
import ToolbarContainer from 'containers/ToolbarContainer';
import Permission from 'components/Permission';

function to(path = '') {
  if (!path) return '/';
  return `/dashboard${path}`;
}

function Toolbar() {
  return (
    <ToolbarContainer
      title={'Dashboard'}
    >
      <NavTabs>
        <Tab to={to()}>Overview</Tab>
        <Tab role={1338} to={to('/analytics')}>Analytics</Tab>
        <Tab role={1337} to={to('/analytics')}>Analytics</Tab>
      </NavTabs>
    </ToolbarContainer>
  );
}

export default Toolbar;
