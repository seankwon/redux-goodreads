import { connect } from 'react-redux'
import { deleteBook } from '../actions/CartActions'
import Cart from '../components/Cart'

const mapStateToProps = (state) => {
  const { cart } = state
  return {
    cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeBookFromCart: (id) => {
      dispatch(deleteBook(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
