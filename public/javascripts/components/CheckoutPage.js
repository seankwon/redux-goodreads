import React, { Component, PropTypes } from 'react'
import CheckoutList from './CheckoutList'

export default class CheckoutPage extends Component {
  render() {
    return (
      <CheckoutList 
        checkoutAllBooks={this.props.checkoutAllBooks} 
        deleteBook={this.props.deleteBook} 
        cart={this.props.cart}/>
    )
  }
}

CheckoutPage.propTypes = {
  deleteBook: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
}
