import React from 'react'
import classes from './ProductCard.scss'
import {Link} from 'react-router'
import ProductImage from 'components/CardImage'
import cx from 'classnames'

export const ProductCard = ({name, id, sold_out, category, price, under_sale, sale_price, thumbnail}) => {
  return (
    <div className={cx("col-xs-12 col-sm-6 col-md-4", classes.card_container)}>
      <Link to={`/${id}/${encodeURIComponent(name)}`}>
        <ProductImage src={thumbnail}/>
        <ProductTitle>{name}</ProductTitle>
        <ProductCategory>{category}</ProductCategory>
        <ProductPrice
          price={price}
          onSale={under_sale}
          salePrice={sale_price}
        />
        <SoldOutStatus isSoldOut={sold_out}/>
      </Link>
    </div>
  )
};

export const ProductTitle = ({children}) =>
  <p>
    <strong>
      {children}
    </strong>
  </p>;

export const ProductPrice = ({price, onSale, salePrice}) =>
  onSale ?
    <p>${price / 100}</p> :
    <p>
      <span style={{textDecoration: 'line-through'}}>
        ${price / 100}
      </span>
      {` $${salePrice / 100}`}
    </p>;

export const SoldOutStatus = ({isSoldOut}) => isSoldOut ? <p style={{color: 'red'}}>Sold Out</p> : null;

export const ProductCategory = ({children}) =>
  <p>
    <em>
      {children}
    </em>
  </p>;

export class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    const {displayImage} = props;
    this.state = {
      mainImage: displayImage
    }
  }

  componentWillReceiveProps(nextProps) {
    const {displayImage:mainImage} = nextProps;
    this.setState({mainImage});
  };

  handleImageClick = mainImage => () => this.setState({mainImage});


  render() {
    const {mainImage} = this.state;
    const {displayImage, galleryImages} = this.props;
    return (
      <div className="row">
        <div className="col-xs-9">
          <img className={classes.main_image} src={mainImage}/>
        </div>
        <div className="col-xs-3">
          {[displayImage, ...galleryImages].map(image =>
            <img
              key={image}
              className={cx(classes.side_thumbnail, {[classes.active_thumbnail]: image === mainImage})}
              src={image}
              onClick={this.handleImageClick(image)}/>
          )}
        </div>
      </div>
    )
  }
}
