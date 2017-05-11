import React from 'react'
import classes from './PriceFilter.scss'
import {Link} from 'react-router'
import Slider from 'material-ui/Slider';
import debounce from 'lodash/debounce';
import queryString from 'query-string'

class PriceFilter extends React.Component {
  constructor(props) {
    super(props);
    const {maxPriceFilter, query} = props;
    this.state = {
      priceFilterValue: query['price_lt'] || maxPriceFilter
    };
    this.debouncedPriceFilter = debounce(this.routeOnPriceFilter, 300)
  }

  componentWillReceiveProps(nextProps) {
    const {maxPriceFilter, query:{price_lt}} = nextProps;
    const priceFilterValue = price_lt > 0 ? price_lt : maxPriceFilter;
    this.setState({priceFilterValue});
  };

  handlePriceFilter = (event, value) => {
    this.setState({priceFilterValue: value}, () => this.debouncedPriceFilter(value))
  };

  routeOnPriceFilter = priceFilterValue => {
    const {goToRoute, maxPriceFilter, pathname, query} = this.props;
    let {price_lt, ...nextParams} = query;
    if (priceFilterValue < maxPriceFilter) {
      nextParams = {...query, price_lt: priceFilterValue};
    }
    let search = queryString.stringify(nextParams);
    search = search ? `?${search}` : '';
    goToRoute({pathname, search});
  };

  render() {
    const {maxPriceFilter} = this.props;
    const {priceFilterValue} = this.state;
    return (
      <div className={classes.filter_panel}>
        <strong>
          Price {priceFilterValue && parseInt(priceFilterValue) < maxPriceFilter ? `less than $${priceFilterValue}` : ''}
        </strong>
        <Slider
          min={1}
          max={maxPriceFilter}
          step={1}
          value={parseInt(priceFilterValue)}
          onChange={this.handlePriceFilter}
          sliderStyle={{marginBottom: '0px'}}
        />
      </div>
    )
  }
}

export default PriceFilter
