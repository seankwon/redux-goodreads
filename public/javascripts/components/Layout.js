import React, { Component } from 'react';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../actions/LibraryActions';
import { connect } from 'react-redux';

class Layout extends Component { 
  render() {
    return (
      <div id='maincontainer'>
        <nav className="mainnav">
          <div className="container clearfix">
            <div className='nav-section left'>
              <div className="nav-item logo"><h1>Redux Public Library</h1></div>
            </div>
            <div className='nav-section right'>
              <div className="nav-item">
                <input placeholder="Search by Title/Author" className="search-bar" type="text" />
              </div>
            </div>
          </div>
        </nav>
        {React.cloneElement(this.props.children, { ...this.props, key: undefined, ref: undefined })}
      </div>
    );
  }
}

export default connect()(Layout);