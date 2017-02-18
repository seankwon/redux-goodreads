import { expect } from 'chai';
import { addBook, deleteBook } from '../../public/javascripts/actions/CartActions';
import cart from '../../public/javascripts/reducers/CartReducer';

describe('Cart Reducer', () => {
  let book = {
    id: '1',
    year: '1985',
    rating: '5435',
    author: 'Tester testerson',
    image_url: 'woo'
  }

  it('should return an empty array if state is undefined', () => {
    expect(cart(undefined, undefined)).to.be.empty;
  });

  it('should return a cart with a book if ADD_BOOK is called', () => {
    expect(cart(undefined, addBook(book))).to.deep.equal([book]);
  });

  it('should add a book to the state with existing books', () => {
    let state = [{id: '12', year: '1', rating: '1', author: 'hello', image_url: 'wo'}]
    expect(cart(state, addBook(book))).to.deep.equal([...state, book]);
  });

  it('should not add a book if the book is already in the cart', () => {
    let state = [{id: '1', year: '1', rating: '1', author: 'hello', image_url: 'wo'}]
    expect(cart(state, addBook(book))).to.deep.equal(state);
  });

  it('should return an empty array if state is undefined', () => {
    let state = [{id: '1', year: '1', rating: '1', author: 'hello', image_url: 'wo'}]
    expect(cart(undefined, deleteBook(state[0]))).to.be.empty;
  });

  it('should delete a book if the book exists', () => {
    let state = [{id: '1', year: '1', rating: '1', author: 'hello', image_url: 'wo'}]
    expect(cart(state, deleteBook('1'))).to.be.empty;
  });

  it('should delete a book if the book exists', () => {
    let state = [{id: '1', year: '1', rating: '1', author: 'hello', image_url: 'wo'},
      {id: '2', year: '1', rating: '1', author: 'hello', image_url: 'wo'},
      {id: '3', year: '1', rating: '1', author: 'hello', image_url: 'wo'}
    ]

    let winState = [
      {id: '2', year: '1', rating: '1', author: 'hello', image_url: 'wo'},
      {id: '3', year: '1', rating: '1', author: 'hello', image_url: 'wo'}
    ];

    expect(cart(state, deleteBook('1'))).to.deep.equal(winState);
  });
});
