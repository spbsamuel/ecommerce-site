import request from 'superagent'
import queryString from 'query-string'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_DETAILS_REQUEST = 'FETCH_DETAILS_REQUEST';
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

const apiBase = (path) =>
  request.get(`ADD_YOUR_ENDPOINT_HERE/${path}`);

const genQueryFromParam = param => {
  let endpointQuery = {};
  if (param['category']) {
    endpointQuery['filter[category_in]'] = param['category'];
  }
  if (param['price_lt']) {
    endpointQuery['filter[price_lt]'] = param['price_lt'] * 100;
  }
  if (param['sort_price']) {
    endpointQuery['sort'] = param['sort_price'] === 'asc' ? 'price' : '-price';
  }
  if (param['size']) {
    endpointQuery['page[size]'] = param['size'];
  }
  if (param['page']) {
    endpointQuery['page[number]'] = param['page'];
  }
  return endpointQuery;
};

const endPointUrls = {
  products: params => 'products',
  productDetails: params => `products/${params}`
};

const apiEntityRequest = (type, params = {}) => apiBase(endPointUrls[type](params));

export const fetchProducts = (type, param = {}) => (dispatch) => {

  if (Object.keys(endPointUrls).indexOf(type) < 0) return;

  dispatch({
    type: 'FETCH_PRODUCTS_REQUEST',
    request: {type, param},
  });

  return apiEntityRequest(type)
    .query(genQueryFromParam(param))
    .end(
      (err, res) => dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        requestType: type,
        response: res.body,
      })
    );
};

export const fetchProductDetails = (type, id) => (dispatch) => {

  if (Object.keys(endPointUrls).indexOf(type) < 0) return;

  dispatch({
    type: 'FETCH_DETAILS_REQUEST',
    request: {type, id},
  });

  return apiEntityRequest(type, id)
    .end(
      (err, res) => dispatch({
        type: 'FETCH_DETAILS_SUCCESS',
        requestType: type,
        response: res.body,
      })
    );
};


export const actions = {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS
};

const thumbnailAR = ['350x600', '200x400'];
const highResAR = ['800x1200', '1200x900'];

const thumbnailGenerator = (id, name) => encodeURI(`http://placehold.it/${thumbnailAR[id % thumbnailAR.length]}?text=${name}`);

const highResGenerator = (id, name) => encodeURI(`http://placehold.it/${highResAR[id % highResAR.length]}?text=${name}`);

const galleryGenerator = (id, name) => ['Front', 'Left', 'Right', 'Back'].map(pos => encodeURI(`http://placehold.it/${highResAR[id % highResAR.length]}?text=${pos} of ${name}`));

const mapProductsToState = (state, action) => {
  const {response:{data, links}} = action;
  const productsServerVisible = data.reduce((idList, product) => [...idList, product['id']], []);
  const productsById = data
    .reduce((productObj, product) => ({
      ...productObj,
      [product['id']]: {
        ...product['attributes'],
        id: product['id'],
        thumbnail: thumbnailGenerator(product['id'], product['attributes']['name']),
        displayImage: highResGenerator(product['id'], product['attributes']['name']),
        galleryImages: galleryGenerator(product['id'], product['attributes']['name']),
      }
    }), {});
  const mergedProductById = {...state['products'], ...productsById};
  let maxPages = 1;
  if (links && links['self']) {
    maxPages = state['maxPages'];
    if (links['last']) {
      const search = queryString.extract(links['last']);
      const query = queryString.parse(search);
      maxPages = parseInt(query['page[number]'] || maxPages);
    }
  }
  return {...state, products: mergedProductById, productsLoading: false, productsServerVisible, maxPages}
};

const mapDetailsToState = (state, action) => {
  const {response:{data:{id, attributes}}} = action;
  const {products} = state;
  const details = {
    ...attributes,
    id,
    thumbnail: thumbnailGenerator(id, attributes['name']),
    displayImage: highResGenerator(id, attributes['name']),
    galleryImages: galleryGenerator(id, attributes['name']),
  };
  return {...state, products: {...products, [id]: details}}
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_PRODUCTS_REQUEST]: (state, action) => ({...state, [`${action.request.type}Loading`]: true}),
  [FETCH_PRODUCTS_SUCCESS]: mapProductsToState,
  [FETCH_DETAILS_REQUEST]: (state, action) => ({...state, [`${action.request.type}Loading`]: true}),
  [FETCH_DETAILS_SUCCESS]: mapDetailsToState
};

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  products: {},
  productsServerVisible: [],
  productsLoading: false,
  productsDetailsLoading: false,
  productCategories: {
    'Mark Up': 'markup',
    'Tools': 'tools',
    'Brushes': 'brushes'
  },
  maxPriceFilter: 100,
  maxPages: 1
};

export const entitiesReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default entitiesReducer

