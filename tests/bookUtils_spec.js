import { expect } from 'chai';
import { getBooks, fetchBooksIfNeeded } from '../public/javascripts/utils/BookUtils';
//TODO convert to es6 syntax
var fetchMock = require('fetch-mock');
import library from '../public/javascripts/reducers/LibraryReducer';
import { readFileSync } from 'fs';
import {
    requestBooks,
    receiveBooks
} from '../public/javascripts/actions/LibraryActions';

describe('BookUtils', () => {
  beforeEach(() => {
    fetchMock.get('*', readFileSync('tests/bookResponse.xml').toString());
  });

  describe('getBooks', () => {
    const answer1 = { id: '375802',
      year: '1985',
      rating: '4.29',
      author: 'Orson Scott Card',
      image_url: '\r\nhttps://images.gr-assets.com/books/1408303130m/375802.jpg\r\n',
      title: 'Ender\'s Game (Ender\'s Saga, #1)',
      query: 'Enders Game' 
    };

    it('should return a list of converted objects for a search', () => {
      getBooks('Enders Game').then((data) => {
        expect(data['375802']).to.deep.equal(answer1);
      });
    });
  });

  describe('getBooks with LibraryReducer', () => {
    it('should return readable data to the reducer', () => {
      getBooks('Enders Game').then((data) => {
        expect(library(undefined, receiveBooks(data, 'Enders Game'))['375802'])
          .deep.equal(answer1);
      });
    })
  });
});