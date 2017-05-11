export default (store) => ({
  path: '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ProductListingView = require('./ProductListingView').default;
      cb(null, ProductListingView);

    /* Webpack named bundle   */
    }, 'product_listing_view');
  }
});
