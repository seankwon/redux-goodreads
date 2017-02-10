import React, { Component } from 'react';
import { getBook } from '../utils/BookUtils';

export default class BookPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //getBook(this.props.params.bookid).then(data => console.log(data));
  }

  render() {
    return (
      <div className="book-page-container">
        Working
      </div>
    );
  }
}
