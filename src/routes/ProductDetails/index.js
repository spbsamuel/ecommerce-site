export default (store) => ({
  path: '/:id/:item',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ProductDetailsView = require('./containers/ProductDetailsViewContainer').default;
      cb(null, ProductDetailsView);

    /* Webpack named bundle   */
    }, 'product_details_view');
  }
});
