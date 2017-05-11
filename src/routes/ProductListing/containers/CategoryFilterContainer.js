import {connect} from 'react-redux';
import CategoryFilter from '../components/CategoryFilter'
import {fetchEntity} from 'store/core_reducers/entitiesReducer'
import {activeCategories, toggleCategoryParams} from '../selectors/filterControlParams'

const mapStateToProps = (state, {query, pathname}) => {
  return {
    activeCategories: activeCategories(state, query),
    toggleCategoryParams: toggleCategoryParams(state, query),
    pathname,
    query
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
