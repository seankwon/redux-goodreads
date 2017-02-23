import { expect } from 'chai';
//TODO: convert to es6 syntax
var fetchMock = require('fetch-mock');
import { 
  requestSearch,
  receiveSearch,
  requestInfo,
  receiveInfo,
  throwFetchInfoError,
  throwSearchError
} from '../../public/javascripts/actions/NavigatorActions';
import navigator from '../../public/javascripts/reducers/NavigatorReducer';

describe('navigator reducer', () => {
});
