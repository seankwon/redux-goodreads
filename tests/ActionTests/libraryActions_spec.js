import { expect } from 'chai'
import * as types from '../../public/javascripts/constants/ActionTypes'
import {
  storeBooksData,
  receiveDetailedBook
} from '../../public/javascripts/actions/LibraryActions'

describe ('LibraryActions', () => {
  it ('storeBooksData should store json data', () => {
    expect(storeBooksData({}, 'John Smith'))
      .to.deep.equals({
        type: types.STORE_BOOKS_DATA,
        data: {},
        query: 'John Smith'
      })
  })

  it ('receiveDetailedBook should receive detailed data', () => {
    expect(receiveDetailedBook({description: 'more detailed'}, '1'))
      .to.deep.equals({
        type: types.RECEIVE_DETAILED_BOOK,
        data: {description: 'more detailed'},
        id: '1'
      })
  })
})
