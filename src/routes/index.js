import ProductListingRoute from './ProductListing';
import ProductDetailsRoute from './ProductDetails'
import StandardLayout from 'layouts/StandardLayout'

export const createRoutes = (store) => {

  return ({
    path: '',
    childRoutes: [
      {
        path: '',
        component: StandardLayout,
        childRoutes: [
          ProductListingRoute(store),
          ProductDetailsRoute(store)
        ]
      }
    ]
  })
};

export default createRoutes;
