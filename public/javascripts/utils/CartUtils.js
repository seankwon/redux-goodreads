import { addBook } from '../actions/CartActions';

export function addBookToCart(id) {
  return (dispatch, getState) => {
    const { books } = getState().library;
    let requestedBook = books.find(book => book.id === id);
    return dispatch(addBook(requestedBook));
  }
}
