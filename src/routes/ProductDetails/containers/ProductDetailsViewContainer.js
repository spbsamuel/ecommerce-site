import {connect} from 'react-redux';
import ProductDetailsView from '../ProductDetailsView'
import {fetchProductDetails} from 'store/core_reducers/entitiesReducer'
import {goBack} from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  const {params:{id, item}} = ownProps;
  const {entities:{products}} = state;
  const productDetails = products[id] || {};
  if (products[id] && item != productDetails['name']) return {};
  return {...productDetails, id}
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestDetails: id => dispatch(fetchProductDetails('productDetails', id)),
    goBack: () => dispatch(goBack())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsView);
