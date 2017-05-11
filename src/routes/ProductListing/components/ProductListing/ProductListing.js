import React from 'react'
import classes from './ProductListing.scss'
import {ProductCard} from 'components/ProductCard'
import isEqual from 'lodash/isEqual'

class ProductListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestEvents(this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    const {params:currentParams} = this.props;
    const {params:nextParams} = nextProps;
    if (!isEqual(currentParams, nextParams)) {
      console.log('I updated');
      this.props.requestEvents(nextParams);
    }
  }

  render() {
    const {products} = this.props;
    return (
      <div className="row">
        {
          products.map(product =>
            <ProductCard
              key={product.id}
              {...product}
            />)
        }
      </div>
    )
  }
}

export default ProductListing
