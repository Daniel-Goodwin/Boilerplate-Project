import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import { updateWidth } from 'actions/WindowActions';
import { syncUserAuthState, syncCustomer, syncUser, syncRole } from 'actions/SyncActions';
import { push } from 'react-router-redux';
import { instances, createInstance } from 'services/firebase';

class App extends Component {

  constructor(props) {
    super(props);
    props.syncUserAuthState();
  }

  componentDidMount() {
    if (!this.props.user.isLoggedIn) {
      console.log('not logged in')
    }
  }

  componentWillReceiveProps(nextProps) {
    // If the user is not logged in, redirect them
    if (!nextProps.user.isLoggedIn) {
      return this.props.push('/login');
    }

    // If the user is logged in but have no data
    if (!nextProps.user.response) {
      this.props.syncUser(nextProps.user.uid);
      return this.props.syncRole(nextProps.user.uid);
    }

    // If we've got no instance, create one
    if (!instances[nextProps.user.response.customer]) {
      createInstance(nextProps.customer.config, nextProps.user.response.customer);
    }
  }

  /**
   * Render the CMS
   */
  render() {
    const { user, children } = this.props;

    if (!user) {
     return <div>loading</div>;
    }

    return (
      <Measure
        whitelist={['width']}
        onMeasure={this.props.updateWidth}
      >
        {children}
      </Measure>
    );
  }
}

App.propTypes = {
  syncUserAuthState: PropTypes.func.isRequired,
  syncUser: PropTypes.func.isRequired,
  customer: PropTypes.object,
  user: PropTypes.object,
};

function select(state) {
  return {
    customer: state.customer,
    user: state.user,
  };
}

function actions(dispatch) {
  return {
    updateWidth: ({ width }) => dispatch(updateWidth(width)),
    syncUserAuthState: () => dispatch(syncUserAuthState()),
    syncUser: id => dispatch(syncUser(id)),
    syncRole: id => dispatch(syncRole(id)),
    push: path => dispatch(push(path)),
  };
}

export default connect(select, actions)(App);
