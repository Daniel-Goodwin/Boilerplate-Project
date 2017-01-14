import React from 'react';
import Card, { Title } from 'components/Card';
import RaisedButton from 'material-ui/RaisedButton';

import Permission from 'components/Permission';

function Overview() {
  return (
    <div>
      <Card>
        <Title
          title={'Overview'}
        >
          <RaisedButton label="Primary" primary={true} />
          <RaisedButton label="Primary" primary={true} />
        </Title>
        <Permission
          permission={'createOffers'}
          onError={<div>No Access</div>}
        >
          <div>Here</div>
        </Permission>
      </Card>
    </div>
  );
}

export default Overview;
