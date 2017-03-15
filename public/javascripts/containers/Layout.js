import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../utils/BookUtils';

const mapStateToProps = (state) => ({
  checkoutDone: state.navigator.checkoutDone,
  isFetching: state.navigator.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  onSearch(query) {
    dispatch(fetchBooksIfNeeded(query));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
