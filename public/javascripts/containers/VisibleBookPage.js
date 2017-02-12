import BookPage from '../components/BookPage'
import { fetchBookInfoIfNeeded } from '../utils/BookUtils'
import { connect } from 'react-redux'
import { dispatch } from 'redux'

const mapStateToProps = (state) => {
  return {
    bookInfo: state.library.bookPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookInfoIfNeeded(id) {
      return dispatch(fetchBookInfoIfNeeded(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
