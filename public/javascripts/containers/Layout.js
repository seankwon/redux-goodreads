import Layout from '../components/Layout';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { fetchBooksIfNeeded } from '../utils/BookUtils';

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => {
      dispatch(fetchBooksIfNeeded(query));
    }
  }
}

export default connect(null, mapDispatchToProps)(Layout);
