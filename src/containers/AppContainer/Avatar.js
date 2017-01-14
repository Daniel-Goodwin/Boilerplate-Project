import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as MaterialAvatar } from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { signOut } from 'actions/UserActions';

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      avatarContextOpen: false,
    };
  }

  /**
   * For the context menu on clicking the avatar
   * @param event
   */
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      avatarContextOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  /**
   * For the context menu on clicking the avatar
   */
  handleRequestClose = () => {
    this.setState({
      avatarContextOpen: false,
    });
  };

  render() {
    return (
      <span>
        <MaterialAvatar
          size={30}
          src={'http://placehold.it/128x128'}
          onClick={this.handleTouchTap}
        />
        <Popover
          open={this.state.avatarContextOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem
              onClick={this.props.signOut}
              primaryText="Sign out"
            />
          </Menu>
        </Popover>
      </span>
    );
  }
}

function actions(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  };
}

export default connect(null, actions)(Avatar);
