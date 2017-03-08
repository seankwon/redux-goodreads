import React, { Component, PropTypes } from 'react'

export default class CheckoutBook extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(id) {
    this.props.deleteBook(id)
  }

  render () {
    const {
      image_url,
      author,
      rating,
      title,
      year,
      id
    } = (this.props.bookprops || {})

    return (
      <div className='flex flex-wrap checkout-book'>
        <div className='col col-2 ch-book-img-container'>
          <img src={image_url} />
        </div>
        <div className='ch-book-desc-container'>
          <p className='title'>{title}</p>
          <p>{author}</p>
          <p>{year}</p>
          <a onClick={() => this.handleRemove(id)}>Remove Book</a>
        </div>
      </div>
    )
  }
}

CheckoutBook.propTypes = {
  deleteBook: PropTypes.func,
  bookprops: PropTypes.object
}
