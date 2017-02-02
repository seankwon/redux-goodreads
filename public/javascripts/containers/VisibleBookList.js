import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { addBookToCart } from '../utils/CartUtils';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import BookList from '../components/BookList';

const mapStateToProps = (state) => {
  const { books, searches } = state.library;
  const { currentQuery, isFetching } = state.navigator;
  const currentSearchIdxs = searches[currentQuery];
  //FIXME: THIS IS GROSS.
  const currentSearches = (typeof currentSearchIdxs === 'undefined') ? 
                            [] : 
                            currentSearchIdxs.map((id) => books[id]);
  
  return {
    isFetching,
    currentSearches
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
