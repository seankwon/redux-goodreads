import { addBook } from '../actions/CartActions';

export function addBookToCart(id) {
  return (dispatch, getState) => {
    const { books } = getState().library.books;
    let requestedBook = books.find(book => book.id === parseInt(id));
    return dispatch(addBook(requestedBook));
  }
}
