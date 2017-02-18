import React, { Component } from 'react'
import BookPageMainInfo from './BookPageMainInfo'
import BookPageSideInfo from './BookPageSideInfo'

export default class BookPage extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // get Initial Data
    this.props.fetchBookInfoIfNeeded((this.props.params.bookid))
  }

  render () {
    return (
      <div className="book-page-container container flex flex-wrap">
        <BookPageMainInfo {...this.props} />
        <BookPageSideInfo {...this.props} />
      </div>
    )
  }
}

