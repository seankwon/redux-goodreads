import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { addBookToCart } from '../utils/CartUtils';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import BookList from '../components/BookList';

const getCurrentSearches = (state) => {
  const { currentQuery } = state.navigator;
  const { books, searches } = state.library;
  let idsOfBooksInCurrentQuery = searches[currentQuery];

  if (typeof idsOfBooksInCurrentQuery === 'undefined') {
    return [];
  }
  return idsOfBooksInCurrentQuery.map((id) => books[id]);
}

const mapStateToProps = (state) => {
  const { currentQuery, isFetching } = state.navigator;
  
  return {
    currentSearches: getCurrentSearches(state),
    isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addBookToCart(id));
    },

    onStartup: () => {
      dispatch(fetchBooksIfNeeded('Marilynne Robinson'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
