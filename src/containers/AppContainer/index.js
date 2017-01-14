import React, { Component } from 'react';
import { connect } from 'react-redux';
import S from 'string';
import AppBar from 'material-ui/AppBar';
import DrawerContainer from '../DrawerContainer';
import ContentContainer from '../ContentContainer';
import Avatar from './Avatar';


class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: props.isDesktop,
      showSubtitle: false,
      avatarContextOpen: false,
    };
  }

  /**
   * Listen for app wide scroll actions
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * Unsubscrive from scroll actions
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Handle scroll events
   */
  handleScroll = () => {
    const yOffset = window.pageYOffset;

    if (yOffset >= 48 && !this.state.showSubtitle) {
      this.setState({
        showSubtitle: true,
      });
    } else if (yOffset < 48 && this.state.showSubtitle) {
      this.setState({
        showSubtitle: false,
      });
    }
  };

  /**
   * Toggle the drawer open/closed
   */
  toggleDrawerState() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  /**
   *
   * @returns {XML}
   */
  renderRightElements() {
    return (
      <div>
        <Avatar />
      </div>
    )
  }

  /**
   *
   * @returns {XML}
   */
  renderTitle() {
    const path = this.props.router.getCurrentLocation().pathname.split('/').filter(Boolean);
    const title = path[0];

    return (
      <div>
        <span>De Tipsters</span>
        <span
          style={Object.assign({}, styles.subTitle, this.state.showSubtitle ? styles.subTitleShown : styles.subTitleHidden)}
        >
          {title ? S(title).capitalize().s : 'Dashboard'}
        </span>
      </div>
    );
  }

  /**
   * Render
   */
  render() {
    return (
      <div>
        <AppBar
          style={styles.appBar}
          titleStyle={styles.titleStyle}
          showMenuIconButton={!this.props.isDesktop}
          onLeftIconButtonTouchTap={this.toggleDrawerState.bind(this)}
          title={this.renderTitle()}
          iconElementRight={this.renderRightElements()}
        />
        <DrawerContainer
          isOpen={this.props.isDesktop ? true : this.state.drawerOpen}
          isDesktop={this.props.isDesktop}
          onClose={this.toggleDrawerState.bind(this)}
        />
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
