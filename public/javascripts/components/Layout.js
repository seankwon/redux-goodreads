import React, { Component } from 'react';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import Cart from './Cart';
import Nav from './Nav';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='maincontainer'>
        <Nav onSearch={this.props.onSearch}/>
        {React.cloneElement(this.props.children, { ...this.props, key: undefined, ref: undefined })}
        <Cart />
      </div>
    );
  }
}
