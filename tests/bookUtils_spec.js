import { expect } from 'chai';
import { getBooks } from '../public/javascripts/utils/BookUtils';
//TODO convert to es6 syntax
var fetchMock = require('fetch-mock');
import { readFileSync } from 'fs';

describe('BookUtils', () => {
  describe('getBooks', () => {
    beforeEach(() => {
      fetchMock.get('*', readFileSync('tests/bookResponse.xml').toString());
    });

    it('should return a list of converted objects for a search', () => {
      getBooks('Enders Game').then((data) => {
        expect(data[0]['id']).to.equal('2422333');
      });
    });
  });
});