import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { addBookToCart } from '../utils/CartUtils'
import { deleteBook } from '../actions/CartActions'
import { fetchBooksIfNeeded } from '../utils/BookUtils'
import BookList from '../components/BookList'

const mapStateToProps = (state) => {
  const { isFetching, page, currentQuery } = state.navigator
  const { books } = state.shelf

  return {
    currentSearches: books,
    currentQuery,
    isFetching,
    page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookToCart(id) {
      dispatch(addBookToCart(id))
    },

    onStartup() {
      dispatch(fetchBooksIfNeeded('Marilynne Robinson', 1))
    },

    fetchBooksIfNeeded(curr, page) {
      dispatch(fetchBooksIfNeeded(curr, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
