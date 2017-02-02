import {
    expect
} from 'chai';
import library from '../../public/javascripts/reducers/LibraryReducer'
import {
    requestBooks,
    receiveBooks
} from '../../public/javascripts/actions/LibraryActions';

describe('library reducer', () => {
    const defaultState = {
        books: {},
        searches: {}
    };

    const books = {1: {
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
    }};

    const requestState = {
        books: {},
        searches: {}
    };

    const receiveState = {
      books: {1: books[1], 2: books[2]},
      searches: {'test': [1, 2]}
    }

    it('initializes state', () => {
      expect(library(undefined)).to.deep.equal(defaultState);
    });

    it('should add a list of book objects and a search object', () => {
      expect(library(requestState, receiveBooks(books, 'test'))).to.deep.equal(receiveState);
    });
});
