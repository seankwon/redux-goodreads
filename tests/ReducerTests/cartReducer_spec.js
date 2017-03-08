import { expect } from 'chai';
import { addBook, deleteBook, checkoutAllBooks } from '../../public/javascripts/actions/CartActions';
import cart from '../../public/javascripts/reducers/CartReducer';

describe('Cart Reducer', () => {
  let book = {
    id: '5',
    author: 'John Doe',
    title: 'Generic Book'
  }

  it('should handle ADD_BOOK', () => {
    expect(cart([], addBook(book))).to.deep.equal([book])
  })

  it('should handle DELETE_BOOK', () => {
    expect(cart([book], deleteBook('5'))).to.deep.equal([])
  })

  it('should handle CHECKOUT_ALL_BOOKS', () => {
    expect(cart([book], checkoutAllBooks())).to.deep.equal([])
  })
});
