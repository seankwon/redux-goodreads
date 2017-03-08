import React, { Component, PropTypes } from 'react';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import VisibleCart from '../containers/VisibleCart';
import Nav from './Nav';
import Flash from './Flash'

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='maincontainer'>
        {(this.props.checkoutDone) ? <Flash /> : ""}
        <Nav onSearch={this.props.onSearch}/>
        {React.cloneElement(this.props.children, { ...this.props, key: undefined, ref: undefined })}
        <VisibleCart />
      </div>
    );
  }
}

Layout.propTypes = {
  onSearch: PropTypes.func.isRequired
}
