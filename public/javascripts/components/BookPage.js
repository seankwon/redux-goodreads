import React, { Component } from 'react'
import BookPageMainInfo from './BookPageMainInfo'
import BookPageSideInfo from './BookPageSideInfo'
import Loadable from './Loadable'
import partial from 'lodash.partial'

export default function BookPage(props) {
  const componentToWrap = (props) => {
    return (
      <div className="book-page-container container flex flex-wrap">
        <BookPageMainInfo {...props} />
        <BookPageSideInfo {...props} />
      </div>
    )
  }


  var BookPageWithLoader = Loadable(componentToWrap, partial(props.fetchBookInfoIfNeeded, props.params.bookid))
  return <BookPageWithLoader {...props} />
}

