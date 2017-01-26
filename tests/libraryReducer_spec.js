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
        searches: [],
        isFetching: false
    };
    const requestState = {
        activePage: {},
        isFetching: true,
        searches: [{
            books: [],
            query: 'test',
            active: false
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
        isFetching: false,
        searches: [{
            books: books,
            query: 'test',
            active: true
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
