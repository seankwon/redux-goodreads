import React, { Component, PropTypes } from 'react'

import Book from './Book'

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export default class BookList extends Component {
  constructor (props) {
    super(props)

    this.renderPage = this.renderPage.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    this.props.onStartup()
    window.addEventListener('scroll', debounce(this.handleScroll, 500))
  }

  handleScroll() {
    const { currentQuery, page, isFetching } = this.props

    if ((window.innerHeight + window.scrollY) + 10 >= document.body.offsetHeight && !isFetching) {
      this.props.fetchBooksIfNeeded(currentQuery, page + 1)
    }
  }

  renderPage () {
    if (typeof this.props.currentSearches === 'undefined') {
      return <p>No Books to see here</p>
    }

    return (
      <div id='book-list-container' className='flex flex-wrap'>
        {(this.props.currentSearches || []).map((book) =>
          <Book
            key={book.id}
            id={book.id}
            image_url={book.image_url}
            title={book.title}
            author={book.author}
            addBookToCart={this.props.addBookToCart}
             />
        )}
      </div>
    )
  }

  render () {
    return this.renderPage()
  }
}

BookList.propTypes = {
  currentSearches: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}
