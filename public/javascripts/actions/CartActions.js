export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const addBook = (book) => ({
  type: ADD_BOOK,
  book
});

export const deleteBook = (book) => ({
  type: DELETE_BOOK,
  book
});
