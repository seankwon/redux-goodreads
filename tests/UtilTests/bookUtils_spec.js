import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var fetchMock = require('fetch-mock'); //TODO convert to es6 syntax
import { readFileSync } from 'fs';
import nock from 'nock';
//Required Modules

import { getBooks, fetchBooksIfNeeded } from '../../public/javascripts/utils/BookUtils';
import { REQUEST_SEARCH } from '../../public/javascripts/actions/NavigatorActions';
import library from '../../public/javascripts/reducers/LibraryReducer';
import {
    receiveBooks,
    RECEIVE_BOOKS,
} from '../../public/javascripts/actions/LibraryActions';
//Functions that are being tested

const answer1 = {
  id: '375802',
  year: '1985',
  rating: '4.29',
  author: 'Orson Scott Card',
  image_url: '\r\nhttps://images.gr-assets.com/books/1408303130m/375802.jpg\r\n',
  title: 'Ender\'s Game (Ender\'s Saga, #1)',
  query: 'Enders Game'
};

describe('BookUtils', () => {
  beforeEach(() => {
    fetchMock.get('*', readFileSync('tests/Stubs/bookResponse.xml').toString());
  });

  describe('getBooks', () => {
    it('should return a list of converted objects for a search', () => {
      getBooks('Enders Game').then((data) => {
        expect(data['375802']).to.deep.equal(answer1);
      });
    });

    it('creates RECEIVE_BOOKS when fetching books', () => {
      const query = 'Enders Game'
      const expectedActions = [
        {type: REQUEST_SEARCH, query: query}
      ];
    });
  });

  describe('getBooks with LibraryReducer', () => {
    it('should return readable data to the reducer', () => {
      getBooks('Enders Game').then((data) => {
        expect(library(undefined, receiveBooks(data, 'Enders Game'))['books']['375802'])
          .deep.equal(answer1);
      });
    });
  });

});