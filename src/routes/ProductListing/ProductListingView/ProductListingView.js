import React from 'react'
import classes from './ProductListingView.scss'
import ProductListing from '../containers/ProductListingContainer'
import SortControl from '../components/SortControl'
import PriceFilter from '../containers/PriceFilterContainer'
import CategoryFilter from '../containers/CategoryFilterContainer'
import ProductPerPageControl from '../components/ProductPerPageControl'
import PaginationControl from '../containers/PaginationControlContainer'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class ProductListingView extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {location:{pathname, query}} = this.props;
    const {page, ...nextQuery} = query;
    return (
    <div className="row">
      <div className="hidden-xs col-sm-5 col-md-4 col-padding">
        <CategoryFilter query={nextQuery} pathname={pathname}/>
        <PriceFilter query={nextQuery} pathname={pathname}/>
        <div className="row">
          <SortControl className="col-sm-12 col-md-6 col-padding" query={nextQuery} pathname={pathname}/>
          <ProductPerPageControl className="col-sm-12 col-md-6 col-padding" query={nextQuery} pathname={pathname}/>
        </div>
        <PaginationControl query={query} pathname={pathname}/>
      </div>
      <div className="col-xs-12 col-sm-7 col-md-8 col-padding">
        <RaisedButton className="show-xs" onTouchTap={this.handleOpen} label="Filter Products" fullWidth={true} />
        <ProductListing params={query}/>
        <PaginationControl className="show-xs" query={query} pathname={pathname}/>
      </div>
      <Dialog
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div>
          <CategoryFilter query={nextQuery} pathname={pathname}/>
          <PriceFilter query={nextQuery} pathname={pathname}/>
          <div className="row">
            <SortControl className="col-xs-12 col-padding" query={nextQuery} pathname={pathname}/>
            <ProductPerPageControl className="col-xs-12 col-padding" query={nextQuery} pathname={pathname}/>
          </div>
        </div>
      </Dialog>
    </div>
    );
  }
}

export default ProductListingView
