import React, { Component } from 'react';
import { connect } from 'react-redux';

import { instances } from 'services/firebase';

const decorator = (ComposedComponent, instance = null) => {
  const component = class extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        instance: instances[instance || props.customer] || null,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!instance && this.props.customer !== nextProps.customer) {
        this.setState({
          instance: instances[nextProps.customer],
        });
      }
    }

    render() {
      if (!this.state.instance) {
        console.warn(`Instance "${this.state.instance}" is not defined in Firebase instances. See services/firebase.js.`)
      }

      return (
        <ComposedComponent
          {...this.props}
          instance={this.state.instance}
        />
      );
    }
  };

  function select(state) {
    return {
      customer: state.user.response.customer,
    }
  }

  return connect(select)(component);
};

export default decorator;
