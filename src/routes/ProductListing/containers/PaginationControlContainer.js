import {connect} from 'react-redux';
import PaginationControl from '../components/PaginationControl'

const mapStateToProps = (state, {query, pathname}) => {
  const {entities:{maxPages}} = state;
  return {
    maxPages,
    pathname,
    query
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControl);
