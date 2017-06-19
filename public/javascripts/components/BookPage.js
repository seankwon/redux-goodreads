import React from 'react'
import BookPageMainInfo from './BookPageMainInfo'
import BookPageSideInfo from './BookPageSideInfo'

export default class BookPage extends React.PureComponent {
  render () {
    return (
      <div className="book-page-container container flex flex-wrap">
        <BookPageMainInfo {...this.props} />
        <BookPageSideInfo {...this.props} />
      </div>
    )
  }
}

