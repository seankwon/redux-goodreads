import React, { Component } from 'react';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import Book from './Book';

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleRender = this.handleRender.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    this.props.onStartup();
  }

  handleRender() {
    const { isFetching } = this.props;
    if (isFetching) {
      return (
        <div id='book-list-container'>
          Currently Fetching
        </div>
      );
    }
    return this.renderPage();
  }

  renderPage() {
    if (typeof this.props.activePage.books === 'undefined') {
      return <p>No Books to see here</p>
    }

    return (
      <div id='book-list-container' className='flex flex-wrap'>
        {this.props.activePage.books.map((book) =>
          <Book
            key={book.id}
            id={book.id}
            image_url={book.image_url}
            title={book.title}
            author={book.author}
            addToCart={this.props.addBookToCart} />
        )}
      </div>
    )
  }

  render() {
    return this.handleRender();
  }
}
