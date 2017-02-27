import { expect } from 'chai'
import * as types from '../../public/javascripts/constants/ActionTypes'
import {
  addBook,
  deleteBook,
  checkoutAllBooks
} from '../../public/javascripts/actions/CartActions'

describe('Cart Actions', () => {
  it ('addBook should add a book to the cart', () => {
    expect(addBook({title: 'Example Book'})).to.deep.equals({
      type: types.ADD_BOOK,
      book: { title: 'Example Book' }
    })
  })

  it ('deleteBook should remove a book from the cart by id', () => {
    expect(deleteBook(2)).to.deep.equal({
      type: types.DELETE_BOOK,
      id: 2
    })
  })

  it ('checkoutAllBooks should place books on checkout', () => {
    expect(checkoutAllBooks()).to.deep.equals({type: types.CHECKOUT_ALL_BOOKS})
  })

})