import React, { Component, PropTypes } from 'react';

export default class BookInfo extends Component {
  constructor(props) {
    super(props);
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
    if (typeof deleteBookFromCart !== 'undefined') {
      return (
        <button onClick={() => this.props.deleteBookFromCart(this.props.id)}
          className='btn not-rounded'>
          Delete
        </button>
      )
    }
  }

  render() {
    return (
      <div className='info-container'>
        <div className='btn-container'>
          <div className='btn-wrapper'>
            { this.renderAddButton() }
            { this.renderDeleteButton() }
            <button className='btn not-rounded'>Info</button>
          </div>
        </div>
      </div>
    )
  }
}
