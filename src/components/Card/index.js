import React from 'react';
import Icon from 'components/Icon';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { connect } from 'react-redux';

import styles from './styles';

function Card({ children, style, size, leftMarginReset, isDesktop }) {
  console.log(isDesktop)
  return (
    <div
        style={Object.assign({}, styles.container, { flex: isDesktop ? size : 1, marginLeft: leftMarginReset ? 10 : 10 }, {...style})}
    >
      <div style={{width: '100%'}}>
        {children}
      </div>
    </div>
  );
}

function Title({ icon, title, children }) {
  return (
    <Toolbar
      noGutter
      style={styles.toolbar}
    >
      <ToolbarGroup
        style={{ justifyContent: 'flex-start' }}
      >
        {icon && <Icon
          style={styles.toolbarIcon}
          name={icon}
        />}
        <ToolbarTitle
          style={styles.toolbarTitle}
          text={title}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        {children}
      </ToolbarGroup>
    </Toolbar>
  );
}

function Pagination() {
  return (
    <Toolbar
      noGutter
      style={styles.toolbar}
    >
      <ToolbarGroup>
        Footer
      </ToolbarGroup>
    </Toolbar>
  );
}

function select(state) {
  return {
    isDesktop: state.window.isDesktop,
  }
}

export { Title, Pagination };
export default connect(select)(Card);
