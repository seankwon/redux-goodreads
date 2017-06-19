import { connect } from 'react-redux'
import React, { Component } from 'react'
import { addBookToCart } from '../utils/CartUtils'
import { fetchBooksIfNeeded } from '../utils/BookUtils'
import BookList from '../components/BookList'

function debounce (fn, delay) {
  var timer = null
  return function () {
    // TODO: refactor this copy and paste job
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

class BookListContainer extends Component {
  constructor (props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', debounce(this.handleScroll, 500))
    this.props.onStartup()
  }

  handleScroll () {
    const { currentQuery, page, isFetching } = this.props

    if ((window.innerHeight + window.scrollY) + 10 >= document.body.offsetHeight && !isFetching) {
      this.props.fetchBooksIfNeeded(currentQuery, page + 1)
    }
  }

  render () {
    return (
      <div>
        <BookList {...this.props} />
      </div>
    )
  }
}

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
    addBookToCart (id) {
      dispatch(addBookToCart(id))
    },

    onStartup () {
      dispatch(fetchBooksIfNeeded('Marilynne Robinson', 1))
    },

    fetchBooksIfNeeded (curr, page) {
      dispatch(fetchBooksIfNeeded(curr, page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
