import { addBook } from '../actions/CartActions'
// TODO: Fix this logic, currently doesn't work
export function addBookToCart (id) {
  return (dispatch, getState) => {
    const { cart } = getState()
    const { books } = getState().library
    let requestedBook = books[parseInt(id)]
    const cartIds = cart.map(book => book.id)

    if (cartIds.indexOf(id) === -1) {
      return dispatch(addBook(requestedBook))
    }
  }
}
