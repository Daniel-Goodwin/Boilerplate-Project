import React from 'react';
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Icon from 'components/Icon';

/**
 * Create a Drawer link item
 * @param text
 * @param to
 */
function CreateLink({ text, to, icon }) {
  return (
    <Link
      activeStyle={styles.activeStyle}
      style={styles.linkContainer}
      to={to}
    >
      <FlatButton
        style={styles.buttonContainer}
      >
        {icon &&
        <Icon
          name={icon}
          style={styles.icon}
        />
        }
        <span style={styles.buttonText}>{text}</span>
      </FlatButton>
    </Link>
  );
}

/**
 * Create a static Drawer header
 * @param text
 */
function CreateHeader({ text }) {
  return (
    <div style={styles.headerContainer}>
      <span style={styles.headerText}>{text}</span>
    </div>
  );
}

/**
 * Render the Drawer
 * @param isDesktop
 * @param isOpen
 * @param onClose
 */
function DrawerContainer({ isDesktop, isOpen, onClose }) {
  return (
    <Drawer
      open={isOpen}
      containerStyle={{ paddingTop: isDesktop ? 10 : 0, top: isDesktop ? 48 : 0 }}
      docked={isDesktop}
      onRequestChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <CreateHeader text={'Route Header'} />
      <CreateLink text={'Dashboard'} to="/dashboard" icon="dashboard" />
    </Drawer>
  );
}

const styles = {
  linkContainer: {
    display: 'flex',
    height: 36,
    alignItems: 'center',
    textDecoration: 'none',
  },
  activeStyle: {
    backgroundColor: '#eeeeee',
  },
  headerContainer: {
    marginTop: 5,
    height: 32,
    paddingLeft: 24,
  },
  headerText: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.38)',
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: 24,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20,
    position: 'relative',
    left: -5,
    top: 5,
    marginRight: 8,
  },
};

export default DrawerContainer;
