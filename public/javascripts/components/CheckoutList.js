import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import CheckoutBook from './CheckoutBook'

export default class CheckoutList extends Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleCheckout() {
    this.props.checkoutAllBooks()
    this.props.finishCheckout()
    browserHistory.push('/app/books')
  }

  render () {
    return (
      <div id='checkout-list-container' className='container flex flex-wrap'>
        <h1>Library Cart</h1>
        <div className="divider"></div>

        {(this.props.cart || []).map(book => {
          return <CheckoutBook
                  deleteBook={this.props.deleteBook}
                  key={book.id}
                  bookprops={book} />
        })}
        <a onClick={this.handleCheckout} className="btn-black">Finish Checkout</a>
      </div>
    )
  }
}

CheckoutList.propTypes = {
  deleteBook: PropTypes.func,
  checkoutAllBooks: PropTypes.func,
  cart: PropTypes.object
}
