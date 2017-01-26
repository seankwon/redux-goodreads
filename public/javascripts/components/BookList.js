import React, { Component } from 'react';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../actions/LibraryActions';

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleRender = this.handleRender.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchBooksIfNeeded('Marilynne Robinson'));
  }

  handleRender() {
    const { isFetching } = this.props;
    if (isFetching) {
      return <h1>Fetching</h1>
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
          <div className='col-3 book-container'>
            <div className='image-wrapper'>
              <img src={book.image_url} />
            </div>
            <div className='book-info-container'>
              <h5>{book.author}</h5>
              <p>{book.title}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    return this.renderPage()
  }
}
