import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Measure from 'react-measure';
import { updateWidth } from 'actions/WindowActions';
import { push } from 'react-router-redux';

class App extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Render the CMS
   */
  render() {
    const { children } = this.props;
    
    return (
      <MuiThemeProvider>
        <Measure
          whitelist={['width']}
          onMeasure={this.props.updateWidth}
        >
          {children}
        </Measure>
      </MuiThemeProvider>
    );
  }
}


function actions(dispatch) {
  return {
    updateWidth: ({ width }) => dispatch(updateWidth(width)),
    push: path => dispatch(push(path)),
  };
}

export default connect(null, actions)(App);
