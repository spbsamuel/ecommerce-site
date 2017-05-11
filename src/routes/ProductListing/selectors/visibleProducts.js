import {createSelector} from 'reselect'

export const visibleProducts = createSelector(
  ({entities:{products}}) => products,
  ({entities:{productsServerVisible}}) => productsServerVisible,
  (products, visibleList) => visibleList.map(id => products[id])
);
