import {
    expect
} from 'chai'
import shelf from '../../public/javascripts/reducers/ShelfReducer'
import {
  receiveVisibleBooks,
  emptyShelf
} from '../../public/javascripts/actions/ShelfActions'

describe ('Shelf Reducer', () => {
  it ('should handle RECEIVE_VISIBLE_BOOKS', () => {
    expect(shelf(undefined, receiveVisibleBooks([{title: 'Book One'}])))
      .to.deep.equals({
        books: [{title: 'Book One'}]

      })
  })

  it ('should handle EMPTY_SHELF', () => {
    expect(shelf(undefined, emptyShelf())).to.deep.equals({books: []})
  })
})
