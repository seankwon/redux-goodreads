import React, { Component } from 'react';
import { dispatch } from 'redux';
import Book from './Book'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {hide: true};
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart() {
    this.setState({ hide: !this.state.hide });
  }

  handleCart() {
    const { cart } = this.props;
    if (typeof cart === 'undefined' || cart === null) {
      return <p>No cart Added</p>
    } else {
      return this.renderCart();
    }
  }

  renderCart() {
    const { cart } = this.props;
    return (
      <div>
      {cart.map((book) =>
        <Book
          key={book.id}
          id={book.id}
          image_url={book.image_url}
          title={book.title}
          author={book.author} />
      )}
      </div>
    );
  }

  render() {
    const { hide } = this.state;

    return (
      <div onClick={this.toggleCart} className={hide ? 'hidecart' : 'showcart'} id='cartcontainer'>
        <div className="cart-border"></div>
        <div className="inner-cart">
          {this.handleCart()}
        </div>
      </div>
    );
	}
}
