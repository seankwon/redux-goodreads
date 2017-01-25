import {
    expect
} from 'chai';
import library from '../public/javascripts/reducers/LibraryReducer'
import {
    requestBooks,
    receiveBooks,
    fetchBooksIfNeeded
} from '../public/javascripts/actions/LibraryActions';

describe('library reducer', () => {
    const defaultState = {
        activePage: {},
        searches: []
    };
    const requestState = {
        activePage: {},
        searches: [{
            books: [],
            query: 'test',
            active: false,
            isFetching: true
        }]
    };
    const books = [{
        id: '1',
        year: '1985',
        rating: '5435',
        author: 'Tester testerson',
        image_url: 'woo'
    }];
    const receiveState = {
        activePage: {
            query: 'test',
            books: books
        },
        searches: [{
            books: books,
            query: 'test',
            active: true,
            isFetching: false
        }]
    };

    it('initializes state', () => {
        expect(library(undefined)).to.deep.equal(defaultState);
    });

    it('should add a new query object to the library on request', () => {
        expect(library(undefined, requestBooks('test'))).to.deep.equal(requestState);
    });

    it('should set an active page after receiving books', () => {
        expect(library(requestState, receiveBooks(books, 'test'))).to.deep.equal(receiveState);
    });
});
