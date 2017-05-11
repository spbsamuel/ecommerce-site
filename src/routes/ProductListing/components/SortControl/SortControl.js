import React from 'react'
import classes from './SortControl.scss'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'

export const SortControl = ({className, query, pathname}) => {
  const {sort_price:sortPrice, ...nextQuery} = query;
  const [NO_SORT, PRICE_ASC, PRICE_DESC] = [null, 'asc', 'desc'];
  const priceSortBy = sortPrice || NO_SORT;
  return (
    <div className={className}>
      <SelectField
        fullWidth={true}
        floatingLabelText="Sort Price"
        value={priceSortBy}>
        <MenuItem
          containerElement={<Link to={{pathname, query: nextQuery}}/>}
          primaryText=""
          value={NO_SORT}
        />
        <MenuItem
          containerElement={<Link to={{pathname, query: {...nextQuery, sort_price: PRICE_ASC}}}/>}
          primaryText="Low to High"
          value={PRICE_ASC}
        />
        <MenuItem
          containerElement={<Link to={{pathname, query: {...nextQuery, sort_price: PRICE_DESC}}}/>}
          primaryText="High to low"
          value={PRICE_DESC}
        />
        </SelectField>
    </div>
  )
};

export default SortControl
