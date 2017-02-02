import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { addBookToCart } from '../utils/CartUtils';
import { fetchBooksIfNeeded } from '../utils/BookUtils';
import BookList from '../components/BookList';

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const mapStateToProps = (state) => {
  //FIXME: searches[currentSearch]
  const { books, searches } = state.library;
  //FIXME: THIS IS GROSS.
  const currentSearches = (isEmpty(searches)) ? undefined : searches[Object.keys(searches)[0]]
                            .map((id) => books[id]);
  
  return {
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
