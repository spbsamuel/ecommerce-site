import {createSelector} from 'reselect'
import includes from 'lodash/includes'

const productCategories = createSelector(
  state => state,
  ({entities:{productCategories}}) => productCategories
);

const categoryFromParams = createSelector(
  (state, query) => query,
  ({category}) => category ? category.split(',') : []
);

export const activeCategories = createSelector(
  productCategories,
  categoryFromParams,
  (productCategories, categories) => Object
    .keys(productCategories)
    .reduce((activeCat, key) => ({...activeCat, [key]: includes(categories, productCategories[key])}), {})
);

export const toggleCategoryParams = createSelector(
  productCategories,
  activeCategories,
  (productCategories, activeCategories) => category => {
    const nextActive = {...activeCategories, [category]: !activeCategories[category]};
    return Object
      .keys(nextActive)
      .reduce((categories, key) => nextActive[key] ? [...categories, productCategories[key]] : categories, [])
      .join(',')
  }
);

// export const activePriceRange = createSelector();
//
// export const pageInfo = createSelector();
