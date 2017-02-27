import { expect } from 'chai'
import * as types from '../../public/javascripts/constants/ActionTypes'
import {
  receiveVisibleBooks
} from '../../public/javascripts/actions/ShelfActions'

describe ('Shelf Actions', () => {
  it ('receiveVisibleBooks should receive books', () => {
    expect(receiveVisibleBooks([{title: 'A book'}])).to.deep.equals({
      type: types.RECEIVE_VISIBLE_BOOKS,
      books: [{title: 'A book'}]
    })
  })
})