import React from 'react';
import { connect } from 'react-redux';

function CenterLayout({ children, isDesktop }) {
    return (
        <div style={isDesktop ? styles.container : null}>{children}</div>
    );
}

const styles = {
  container: {
      margin: '0 auto',
      maxWidth: 936,
  },
};

function select(state) {
  return {
    isDesktop: state.window.isDesktop,
  }
}

export default  connect(select)(CenterLayout);
