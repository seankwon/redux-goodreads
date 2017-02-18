import { addBook } from '../actions/CartActions'

export function addBookToCart (id) {
  return (dispatch, getState) => {
    const { books } = getState().library
    let requestedBook = books[parseInt(id)]
    return dispatch(addBook(requestedBook))
  }
}
