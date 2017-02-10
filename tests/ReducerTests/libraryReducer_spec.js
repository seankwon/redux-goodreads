import {
    expect
} from 'chai';
import library from '../../public/javascripts/reducers/LibraryReducer'
import {
    requestBooks,
    receiveBooks,
    receiveDetailedBook
} from '../../public/javascripts/actions/LibraryActions';

describe('library reducer', () => {

  const books = { 
    books: {
      1: {
        id: '1',
        year: '1985',
        rating: '5435',
        author: 'Tester testerson',
        image_url: 'woo',
        query: 'test',
        title: 'Test',
        author_id: '3'
      }, 
      2: {
        id: '2',
        year: '1985',
        rating: '5435',
        author: 'Tester testerson',
        image_url: 'woo',
        query: 'test',
        title: 'Test2',
        author_id: '3'
      }
    },
    searches: {'test': [1, 2]}
  };

  const books2 = {
    books: {
      3: {
        id: '3',
        year: '1985',
        rating: '5435',
        author: 'Tester testerson',
        image_url: 'woo',
        query: 'test',
        title: 'Test2',
        author_id: '3'
      }
    },
    searches: {'test2': [3]}
  }

  const bookPage = {
    id: '3',
    title: 'test',
    isbn: '54325432',
    imageUrl: 'https://tester.com',
    description: 'Lorem Ipsum',
    numPages: '100',
    author: 'tester',
    popularShelves: [],
    buyLinks: [],
    similarBooks: []
  }

  const defaultState = {
    books: {},
    searches: {},
    bookPage: {}
  };

  const requestState = {
      books: {},
      searches: {},
      bookPage: {}
  };

  const receiveState = {
    books: {1: books['books'][1], 2: books['books'][2]},
    searches: {'test': [1, 2]},
    bookPage: {}
  }

  const receiveState2 = {
    books: {1: books['books'][1], 2: books['books'][2], 3: books2['books'][3]},
    searches: {'test': [1, 2], 'test2': [3]},
    bookPage: {}
  }

  const receiveState3 = {
    books: {},
    searches: {},
    bookPage: {
      id: '3',
      title: 'test',
      isbn: '54325432',
      imageUrl: 'https://tester.com',
      description: 'Lorem Ipsum',
      numPages: '100',
      author: 'tester',
      popularShelves: [],
      buyLinks: [],
      similarBooks: []
    }
  }

  it('initializes state', () => {
    expect(library(undefined)).to.deep.equal(defaultState);
  });

  it('should add a list of book objects and a search object', () => {
    expect(library(requestState, receiveBooks(books, 'test'))).to.deep.equal(receiveState);
  });

  it('should add another key to the books object', () => {
    expect(library(receiveState, receiveBooks(books2, 'test2'))).to.deep.equal(receiveState2);
  })

  it('should add a singular book with detailed info', () => {
    expect(library(defaultState, receiveDetailedBook(bookPage, '3'))).to.deep.equal(receiveState3);
  })
});