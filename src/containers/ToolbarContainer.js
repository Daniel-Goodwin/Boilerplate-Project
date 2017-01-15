import React, { Component } from 'react';

class ToolbarContainer extends Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          <span style={styles.title}>Nav?</span>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    paddingLeft: 24,
    padddingRight: 56,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 24,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
};

export default ToolbarContainer;
