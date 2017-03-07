import { connect } from 'react-redux'
import CheckoutPage from '../components/CheckoutPage'
import { deleteBook } from '../actions/CartActions'

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
      // TODO: Convert to Promise or find way to add FinishCheckout
      dispatch(checkoutAllBooks())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
