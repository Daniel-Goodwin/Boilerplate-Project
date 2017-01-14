import React from 'react';
import { Link } from 'react-router';
import Permission from 'components/Permission';

import styles from './styles';

function Tab({ to, children, onClick, ...other }) {
  return (
    <Permission
      {...other}
      onError={<div></div>}
    >
      <Link
        onClick={() => onClick && onClick()}
        to={to}
        style={styles.linkContainer}
      >
        {children}
      </Link>
    </Permission>
  );
}

Tab.propTypes = {
  to: Link.propTypes.to,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Tab;
