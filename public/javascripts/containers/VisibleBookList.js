import { connect } from 'react-redux'
import { dispatch } from 'redux'
import { addBookToCart } from '../utils/CartUtils'
import { deleteBook } from '../actions/CartActions'
import { fetchBooksIfNeeded } from '../utils/BookUtils'
import BookList from '../components/BookList'

const mapStateToProps = (state) => {
  const { isFetching } = state.navigator
  const { books } = state.shelf

  return {
    currentSearches: books,
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookToCart(id) {
      dispatch(addBookToCart(id))
    },

    onStartup() {
      dispatch(fetchBooksIfNeeded('Marilynne Robinson'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
