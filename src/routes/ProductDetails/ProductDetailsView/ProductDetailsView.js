import React from 'react'
import classes from './ProductDetailsView.scss'
import cx from 'classnames'
import {ProductPrice, SoldOutStatus, ProductGallery} from 'components/ProductCard'

class ProductDetailsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {requestDetails, id} = this.props;
    requestDetails(id);
  }

  render() {
    const {
      name = '',
      sold_out:soldOut = false,
      category = '',
      price = 0,
      under_sale:onSale = false,
      sale_price:salePrice = 0,
      displayImage = '',
      galleryImages = [],
      goBack
    } = this.props;
    return (
      <div>
        <button className={classes.back_button}
          onClick={goBack}>
          <i className="material-icons">navigate_before</i><strong>back</strong>
        </button>
        <h1>{name}</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-padding">
            <ProductGallery {...{displayImage, galleryImages}}/>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-padding">
            <ProductPrice {...{price, onSale, salePrice}}/>
            <SoldOutStatus isSoldOut={soldOut}/>
            <p>{category}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetailsView

