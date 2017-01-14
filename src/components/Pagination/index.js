import React, { Component, PropTypes } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Icon from 'components/Icon';
import IconButton from 'components/IconButton';

class Wrapper extends Component {
  
  constructor(props) {
    super(props);
      
    this.state = {
      page: 1,
      loading: true,
      pageDataRefs: {},
      data: [],
      renderActions: false,
      disableNext: false,
    };
    
  }
  
  /**
   * Subscribe to the query event
   */
  componentDidMount() {
    if (this.props.sortBy) {
      this.ref = this.props.query.orderByChild(this.props.sortBy).limitToFirst(this.props.limit || 99999);
    } else {
      this.ref = this.props.query.orderByKey().limitToFirst(this.props.limit || 99999);
    }
    this.ref.on(this.props.event, this.handleUpdate)
  }
  
  /**
   * Unsubscribe
   */
  componentWillUnmount() {
    this.ref.off(this.props.event, this.handleUpdate)
  }
  
  /**
   * On Previous page button click
   */
  onPrevious() {
    this.setState({
      disableNext: false,
    });
    
    if (this.state.page <= 1) return;
    
    this.ref = this.props.query;
    if (this.props.sortBy) {
      this.ref.orderByChild(this.props.sortBy);
    } else {
      this.ref.orderByKey();
    }
    this.ref.limitToFirst(this.props.limit || 99999).startAt(prevItem.id);
  
    this.ref.once(this.props.event, this.handleUpdate);
  
  }
  
  /**
   * On next page button click
   */
  onNext() {
    let lastItem = null;
    let firstItem = null;
    this.state.data.map((item, index) => {
      if(index === 0 ) {
        firstItem = this.state.data[item]
      }
      if(index === this.state.data.length - 1) {
        lastItem = item;
      }
    });
    
    console.log(lastItem)
    this.ref = this.props.query;
    if (this.props.sortBy) {
      this.ref = this.ref.orderByChild(this.props.sortBy);
    } else {
      this.ref = this.ref.orderByKey();
    }
    this.ref = this.ref
      .startAt(lastItem.id ? lastItem.id : lastItem._uid)
      .limitToFirst(this.props.limit || 99999);
    
    this.setState({
      pageDataRefs: {
        prevItem: firstItem,
        lastItem: lastItem,
      }
    });
    this.ref.once(this.props.event, (snapshot) => this.handleUpdate(snapshot, true));
  }
  
  /**
   * Handle updates from Firebase
   * @param snapshot
   */
  handleUpdate = (snapshot, next) => {
    console.log(next)
    const data = [];
    snapshot.forEach(child => {
      data.push(child.val());
    });
    if(data === this.state.data) {
      this.setState({
        renderActions: data.length >= this.props.limit,
        disableNext: true,
      });
      return
    }
    
    this.setState({
      loading: false,
      data,
      renderActions: true,
      page: !next ? this.state.page - 1 : this.state.page + 1,
    });
  };
  
  /**
   * Render action buttons
   * @returns {XML}
   */
  renderActions() {
    return (
      <Toolbar noGutter>
        <ToolbarGroup lastChild>
          <IconButton
            iconStyle={styles.paginationIcon}
            tooltip="Previous"
            disabled={this.state.page <= 1}
            onClick={() => this.onPrevious()}
          >
            <Icon name="keyboard arrow left"/>
          </IconButton>
          <div>Page {this.state.page}</div>
          <IconButton
            iconStyle={styles.paginationIcon}
            tooltip="Next"
            disabled={this.state.disableNext}
            onClick={() => this.onNext()}
          >
            <Icon name="keyboard arrow right"/>
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
  
  /**
   *
   * @returns {*}
   */
  render() {
    console.log('----->', this.state.data)
    if (this.state.loading) {
      return this.props.loading || null;
    }
    
    if (!this.state.data) {
      return this.props.empty || null;
    }
    return (
      <div >
        <div>
          {this.props.renderHeader && this.props.renderHeader(this.state.data)}
          {React.cloneElement(this.props.children, {
            data: this.state.data,
          })}
          {this.props.renderFooter && this.props.renderFooter(this.state.data)}
        </div>
        {this.state.renderActions && this.renderActions()}
      </div>
    );
  }
}

Wrapper.defaultProps = {
  // Set to three to test Pagination
  // @TODO Once happy with how it works change to 25
  limit: 5,
  sortBy: null,
  event: 'value',
  renderActions: true,
};

Wrapper.propTypes = {
  renderHeader: PropTypes.func,
  renderRow: PropTypes.func,
  renderFooter: PropTypes.func,
  limit: PropTypes.number,
  sortBy: PropTypes.string,
  event: PropTypes.string,
  loading: PropTypes.element,
  empty: PropTypes.element,
};

const styles = {
  paginationIcon: {
    color: '#000000',
  },
};

export { default as Pagination } from './Pagination';
export { default as Table } from './Table';
export default Wrapper;
