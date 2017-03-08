import { connect } from 'react-redux'
import { deleteBook } from '../actions/CartActions'
import { enterCheckoutStepOne } from '../actions/NavigatorActions'
import Cart from '../components/Cart'

const mapStateToProps = (state) => {
  const { cart } = state
  return {
    cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeBookFromCart(id) {
      dispatch(deleteBook(id))
    },

    enterCheckoutStepOne() {
      dispatch(enterCheckoutStepOne())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
