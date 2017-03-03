import React, { Component } from 'react'
import CheckoutList from './CheckoutList'

export default class CheckoutPage extends Component {
  render() {
    return (
      <CheckoutList deleteBook={this.props.deleteBook} cart={this.props.cart}/>
    )
  }
}
