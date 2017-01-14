import React, { Component } from 'react';

class ToolbarContainer extends Component {
  render() {
    const { primary2Color } = this.context.muiTheme.palette;

    return (
      <div style={{ background: primary2Color }}>
        <div style={styles.container}>
          <span style={styles.title}>{this.props.title}</span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ToolbarContainer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ToolbarContainer.propTypes = {
  children: React.PropTypes.any,
};

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
