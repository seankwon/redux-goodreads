import { addBook } from '../actions/CartActions'
const CART_LIMIT = 7

export function addBookToCart (id) {
  return (dispatch, getState) => {
    const { cart } = getState()
    const { books } = getState().library
    const cartIds = cart.map(book => book.id)
    let requestedBook = books[parseInt(id)]

    if (cartIds.indexOf(id) === -1 && cartIds < CART_LIMIT) {
      return dispatch(addBook(requestedBook))
    }
  }
}
