import React, { Component } from 'react';
import { dispatch } from 'redux';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {hide: true};
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart() {
    this.setState({ hide: !this.state.hide });
  }

  render() {
    const { hide } = this.state;
    return (
      <div onClick={this.toggleCart} className={hide ? 'hidecart' : 'showcart'} id='cartcontainer'>
        <div className="cart-border"></div>
        <div className="inner-cart"></div>
      </div>
    );
	}
}
