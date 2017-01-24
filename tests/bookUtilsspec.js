import { expect } from 'chai';
import { getBooks } from '../public/javascripts/utils/BookUtils';
import { config } from 'dotenv';

config('../.dotenv');

describe('BookUtils', () => {
  it('should return url with api key', () => {
    expect(process.env.GOODREADS_API_KEY).to.not.equal(undefined);
  });

  describe('getBooks', () => {
    it('should throw error if there is no argument', () => {
      expect(getBooks).to.throw("No Argument");
    });

    it('should show hello world', () => {
      expect(getBooks('The Shawl')).to.equal('hello world');
    });
  });
})
