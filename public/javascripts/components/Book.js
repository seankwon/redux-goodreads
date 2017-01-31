import React, { Component } from 'react';

export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, image_url, title, author, addBookToCart} = this.props;

    return (
      <div key={id} className="image-wrapper col-2 mr2">
        <div className='info-container'>
          <div className='btn-container'>
            <div className='btn-wrapper'>
            <button onClick={() => addBookToCart(id)}
              className='btn not-rounded'>
            Add to Cart
            </button>
              <button className='btn not-rounded'>Info</button>
            </div>
          </div>
        </div>
        <img src={image_url} />
        <h5>{title}</h5>
        <p>{author}</p>
      </div>
    );
  }
}
