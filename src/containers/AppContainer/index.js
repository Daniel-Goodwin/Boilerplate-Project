import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentContainer from '../ContentContainer';

class AppContainer extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <ContentContainer
          isDesktop={this.props.isDesktop}
        >
          {this.props.toolbar}
          {this.props.layout}
        </ContentContainer>
      </div>
    );
  }
}

AppContainer.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    isDesktop: state.window.isDesktop,
  }
}

const styles = {
  appBar: {
    height: 48,
    position: 'fixed',
  },
  titleStyle: {
    fontWeight: 400,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: 0,
    paddingTop: 0,
    letterSpacing: 0,
    fontSize: 20,
    overflow: 'hidden',
    color: '#ffffff',
    height: 48,
    lineHeight: '48px',
    flex: 1,
  },
  subTitle: {
    marginLeft: 20,
    fontSize: 13,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  subTitleHidden: {
    maxHeight: 0,
    bottom: -48,
  },
  subTitleShown: {
    maxHeight: 48,
    bottom: 1,
  },
};

export default connect(select)(AppContainer);
