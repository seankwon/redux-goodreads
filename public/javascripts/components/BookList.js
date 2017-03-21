import React, { Component, PropTypes } from 'react'
import Book from './Book'
import Loadable from './Loadable'

export default function BookList (props) {
  const component = (props) => {
    return (
      <div id='book-list-container' className='flex flex-wrap'>
        {props.currentSearches.map((book) => {
          <Book
            key={book.id}
            id={book.id}
            image_url={book.image_url}
            title={book.title}
            author={book.author}
            addBookToCart={props.addBookToCart} />
        })}
      </div>
    )
  }

  var BookListWithLoader = Loadable(component, props.onStartup)
  return <BookListWithLoader {...props} />
}
