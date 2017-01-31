import { ADD_BOOK, DELETE_BOOK } from '../actions/CartActions';

function books(state, action) {
  let requestedBook = state.find((addedBooks) => addedBooks.id === action.book.id);
  switch(action.type) {
    case ADD_BOOK:
      if (typeof requestedBook !== 'undefined') {
        return state;
      }
      return [...state, action.book];
    case DELETE_BOOK:
      return state.filter(book => action.book.id !== book.id);
  }
  return state;
}

export default function cart(state = [], action) {
  if (typeof action === 'undefined' || action === null) {
    return state;
  }

  switch(action.type) {
    case ADD_BOOK:
      return books(state, action);
    case DELETE_BOOK:
      return books(state, action);
    default:
      return state;
  }
}
