import BookPage from '../components/BookPage'
import { fetchBookInfoIfNeeded } from '../utils/BookUtils'
import { connect } from 'react-redux'
import React from 'react'

class BookPageContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // get Initial Data
    this.props.fetchBookInfoIfNeeded((this.props.params.bookid))
  }

  render () {
    return <BookPage {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    bookInfo: state.library.bookPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookInfoIfNeeded (id) {
      return dispatch(fetchBookInfoIfNeeded(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPageContainer)
