import {
    expect
} from 'chai'
import library from '../../public/javascripts/reducers/LibraryReducer'
import {
    storeBooksData,
    receiveDetailedBook
} from '../../public/javascripts/actions/LibraryActions'

describe ('library reducer', () => {
  it ('should handle STORE_BOOKS_DATA', () => {
    let data = {
      books: {id: 1, author: 'John Doe', title: 'The Generic Book'},
      searches: {'John Doe': {books: [1], page: 1}}
    }
    expect (library({bookPage: {}}, storeBooksData(data, 'John Doe')))
      .to.deep.equals({
        books: data.books,
        searches: data.searches,
        bookPage: {}
      })
  })

  it ('should handle RECEIVE_DETAILED_BOOK', () => {
    let detailedBook = {
      title: 'Generic Book',
      author: 'John Doe',
      description: 'Lorem Ipsum Delorum...',
      id: '2'
    }

    expect (library({
      books: {},
      searches: {}
    }, receiveDetailedBook(detailedBook, '2'))).to.deep.equals({
      books: {},
      searches: {},
      bookPage: detailedBook
    })
  })
})
