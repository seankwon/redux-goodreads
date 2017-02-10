import React, { Component, PropTypes } from 'react';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../utils/BookUtils';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.onHandleEnter = this.onHandleEnter.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onHandleEnter(e) {
    if (e.charCode === 13 && this.state.value.length > 0) {
      this.props.onSearch(this.state.value);
    }
  }

  onValueChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <nav className="mainnav">
        <div className="container clearfix">
          <div className='nav-section left'>
            <div className="nav-item logo"><h1>Redux Public Library</h1></div>
          </div>
          <div className='nav-section right'>
            <div className="nav-item">
              <input
                 placeholder="Search by Title/Author"
                 className="search-bar"
                 type="text"
                 value={this.state.value}
                 onChange={this.onValueChange}
                 onKeyPress={this.onHandleEnter} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  onSearch: PropTypes.func.isRequired
}