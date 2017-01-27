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
          <div key={book.id} className="image-wrapper col-2 mr2">
            <div className='info-container'>
              <div className='btn-container'>
                <div className='btn-wrapper'>
                  <button className='btn not-rounded'>Add to Cart</button>
                  <button className='btn not-rounded'>Info</button>
                </div>
              </div>
            </div>
            <img src={book.image_url} />
            <h5>{book.title}</h5>
            <p>{book.author}</p>
          </div>
        )}
      </div>
    )
  }

  render() {
    return this.handleRender();
  }
}
