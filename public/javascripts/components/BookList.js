import React, { Component, PropTypes } from 'react'

import Book from './Book'

export default class BookList extends Component {
  constructor (props) {
    super(props)

    this.handleRender = this.handleRender.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  componentDidMount () {
    this.props.onStartup()
  }

  handleRender () {
    if (this.props.isFetching) {
      return <p>Currently Fetching Books</p>
    } else {
      return this.renderPage()
    }
  }

  renderPage () {
    if (typeof this.props.currentSearches === 'undefined') {
      return <p>No Books to see here</p>
    }

    return (
      <div id='book-list-container' className='flex flex-wrap'>
        {this.props.currentSearches.map((book) =>
          <Book
            key={book.id}
            id={book.id}
            image_url={book.image_url}
            title={book.title}
            author={book.author}
            addBookToCart={this.props.addToCart} />
        )}
      </div>
    )
  }

  render () {
    return this.handleRender()
  }
}

BookList.propTypes = {
  currentSearches: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}
