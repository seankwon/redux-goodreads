import React, { Component } from 'react'
import CheckoutBook from './CheckoutBook'

export default class CheckoutList extends Component {
  render () {
    return (
      <div id='checkout-list-container' className='container flex flex-wrap'>
        <h1>Library Cart</h1>
        <div className="divider"></div>
        {this.props.cart.map(book => {
          return <CheckoutBook 
                  deleteBook={this.props.deleteBook} 
                  key={book.id} 
                  bookprops={book} />
        })}
      </div>
    )
  }
}
