import React from 'react'
import classes from './ProductPerPageControl.scss'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'

export const ProductPerPageControl = ({className, query, pathname}) => {
  const {size, ...nextQuery} = query;
  const productsPerPage = size || 25;
  const perPageOptions = [5, 10, 25, 50, 100];

  return (
    <div className={className}>
      <SelectField
        fullWidth={true}
        floatingLabelText="Products Per Page"
        value={parseInt(productsPerPage)}
      >
        {perPageOptions.map(qty =>
          <MenuItem
            key={qty}
            containerElement={<Link to={{pathname, query: {...nextQuery, size: qty}}}/>}
            primaryText={qty}
            value={qty}
          />
        )}
        </SelectField>
    </div>
  )
};

export default ProductPerPageControl
