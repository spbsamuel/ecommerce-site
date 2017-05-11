import {connect} from 'react-redux';
import ProductListing from '../components/ProductListing'
import {fetchProducts} from 'store/core_reducers/entitiesReducer'
import {visibleProducts} from '../selectors/visibleProducts'

const mapStateToProps = (state, ownProps) => {
  return {
    products: visibleProducts(state),
    params: ownProps['params']
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestEvents: (params = {}) => dispatch(fetchProducts('products', params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
