import { connect } from 'react-redux'
import CheckoutPage from '../components/CheckoutPage'
import { deleteBook, checkoutAllBooks } from '../actions/CartActions'
import { enterCheckoutStepOne, finishCheckout } from '../actions/NavigatorActions'

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBook(id) {
      dispatch(deleteBook(id))
    },

    checkoutAllBooks() {
      dispatch(checkoutAllBooks())
    },

    finishCheckout() {
      dispatch(finishCheckout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
