import React, { Component } from 'react';
import { connect } from 'react-redux';
import deeps from 'deeps';

class Permission extends Component {

  /**
   * Check if the user has a valid role
   * @returns {boolean}
   */
  validRole() {
    const roles = this.props.roles || this.props.role;

    if (!roles) {
      return true;
    }

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

  /**
   * Check if they have a valid permission
   * @returns {boolean}
   */
  hasPermission() {
    const permissions = this.props.permissions || this.props.permission;

    if (!permissions) {
      return true;
    }

    let hasPermission = false;

    if (Array.isArray(permissions)) {
      permissions.forEach((permission) => {
        if (deeps.get(this.props.rolePermissions, permission) === true) {
          hasPermission = true;
        }
      });
    } else if (permissions && deeps.get(this.props.rolePermissions, permissions) === true) {
      hasPermission = true;
    }

    return hasPermission;
  }

  /**
   *
   * @returns {*|null}
   */
  render() {
    if (!this.validRole() || !this.hasPermission()) {
      return this.props.onError || null;
    }

    return this.props.children;
  }
}

function select(state) {
  return {
    roleValue: state.role.value,
    rolePermissions: state.role.permissions,
  }
}


export default connect(select)(Permission);
