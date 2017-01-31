import { connect } from 'react-redux';
import Cart from '../components/Cart';

const mapStateToProps = (state) => {
  const { cart } = state;
  return {
    cart
  }
}

export default connect(mapStateToProps)(Cart);
