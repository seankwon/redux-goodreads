import { addBook } from '../actions/CartActions'
//TODO: Fix this logic, currently doesn't work
export function addBookToCart (id) {
  return (dispatch, getState) => {
    const { cart } = getState()
    const { books } = getState().library
    let requestedBook = cart.find((cachedBook) => cachedBook.id === books[parseInt(id)]);

    //Checks if the book is already cached
    if (typeof requestedBook !== 'undefined') {
      return dispatch(addBook(requestedBook))
    }
  }
}
