import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class BookInfo extends Component {
  constructor(props) {
    super(props)
  }

  renderAddButton() {
    if (typeof this.props.addBookToCart !== 'undefined') {
      return (
        <button onClick={() => this.props.addBookToCart(this.props.id)}
          className='btn not-rounded'>
        Add to Cart
        </button>
      )
    }

  }

  renderDeleteButton() {
    if (typeof this.props.removeBookFromCart !== 'undefined') {
      return (
        <button onClick={() => this.props.removeBookFromCart(this.props.id)}
          className='btn not-rounded'>
          Delete
        </button>
      )
    }
  }

  render() {
    const { id } = this.props
    return (
      <div className='info-container'>
        <div className='btn-container'>
          <div className='btn-wrapper'>
            { this.renderAddButton() }
            { this.renderDeleteButton() }
            <Link to={`/app/book/${id}`}><button className='btn not-rounded'>Info</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
