import { connect } from 'react-redux';
import BookList from '../components/BookList';

const mapStateToProps = (state) => {
  const { activePage, searches, isFetching } = state.library;
  return {
    activePage,
    searches,
    isFetching
  }
}

export default connect(mapStateToProps)(BookList);