import React, { PureComponent, PropTypes } from 'react'
import Book from './Book'

export default class BookList extends PureComponent {
  render () {
    if (!this.props.currentSearches) {
      return <noscript />
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
}

BookList.propTypes = {
  currentSearches: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}
