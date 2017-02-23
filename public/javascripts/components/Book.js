import React, { Component, PropTypes } from 'react';
import BookInfo from './BookInfo';

export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      image_url,
      title,
      author,
      addBookToCart,
      removeBookFromCart
    } = this.props;

    return (
      <div key={id} className="image-wrapper col-2 mr2">
        <BookInfo id={id} addBookToCart={addBookToCart} removeBookFromCart={removeBookFromCart} />
        <img src={image_url} />
        <h5>{title}</h5>
        <p>{author}</p>
      </div>
    );
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
