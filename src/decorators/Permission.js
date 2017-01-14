import React, { Component } from 'react';
import { connect } from 'react-redux';
import deeps from 'deeps';

const decorator = ({ roles = '', permissions = '' }) => {
  console.log('decorate')
  return (ComposedComponent, DeniedComponent = null) => {

    const component = class extends Component {

      validRole() {
        console.log(this.props)
        let isValid = false;

        if (Array.isArray(roles)) {
          roles.forEach((role) => {
            if (role.toString() === this.props.roleValue.toString()) {
              isValid = true;
            }
          });
        } else if (roles.toString() === this.props.roleValue.toString()) {
          isValid = true;
        }

        return isValid;
      }

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
        if (!this.validRole() || !this.hasPermission()) {
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


    const toReturn = connect(select)(component);
    console.log(toReturn)
    return toReturn;
  };
};

export default decorator;
