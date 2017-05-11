import {connect} from 'react-redux';
import PriceFilter from '../components/PriceFilter'
import {push} from 'react-router-redux'

const mapStateToProps = (state, {query, pathname}) => {
  const {entities:{maxPriceFilter}} = state;
  return {
    maxPriceFilter,
    pathname,
    query
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute: location => dispatch(push(location))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter);
