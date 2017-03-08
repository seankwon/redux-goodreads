import React, { Component, PropTypes } from 'react'
import CheckoutList from './CheckoutList'

export default class CheckoutPage extends Component {
  render() {
    return (
      <CheckoutList
        checkoutAllBooks={this.props.checkoutAllBooks}
        finishCheckout={this.props.finishCheckout}
        deleteBook={this.props.deleteBook}
        cart={this.props.cart}/>
    )
  }
}

CheckoutPage.propTypes = {
  deleteBook: PropTypes.func,
  cart: PropTypes.object
}
