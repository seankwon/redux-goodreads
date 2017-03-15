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
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const currYPos = window.scrollY
    const maxYPos = window.scrollMaxY
    if (currYPos === maxYPos) {
      console.log('bottomhit')
    }
  }

  handleRender () {
    if (this.props.isFetching) {
      return <p></p>
    }
    return this.renderPage()
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
            addBookToCart={this.props.addBookToCart}
             />
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
