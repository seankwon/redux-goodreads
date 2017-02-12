import React, { Component } from 'react';
import { fetchBookInfo } from '../utils/BookUtils';
export default class BookPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.dispatch(fetchBookInfo(this.props.params.bookid))
  }

  render() {
    return (
      <div className="book-page-container">
        Working
      </div>
    );
  }
}

