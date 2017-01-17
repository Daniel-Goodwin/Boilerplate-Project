import React, { Component } from 'react';
import { connect } from 'react-redux';
import deeps from 'deeps';

const decorator = ({ roles = '', permissions = '' }) => {
  return (ComposedComponent, DeniedComponent = null) => {

    const component = class extends Component {
      
      hasPermission() {
        let hasPermission = false;

        if (Array.isArray(permissions)) {
          permissions.forEach((permission) => {
            if (deeps.get(this.props.rolePermissions, permission) === true) {
              hasPermission = true;
            }
          });
        } else {
          if (deeps.get(this.props.rolePermissions, permissions) === true) {
            hasPermission = true;
          }
        }

        return hasPermission;
      }

      render() {
        if (!this.hasPermission()) {
          return DeniedComponent ? DeniedComponent : null;
        }

        return (
          <ComposedComponent
            {...this.props}
          />
        );
      }
    };

    function select(state) {
      return {
        roleValue: state.role.value,
        rolePermissions: state.role.permissions,
      }
    }


    return connect(select)(component);
  };
};

export default decorator;
