import { Product } from '../product';
import * as fromRoot from '../../state/app.state'; // fromRoot is a namespace name
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

// tslint:disable-next-line: max-line-length
export interface State extends fromRoot.State {
  // This is needed as products module is lazy loaded (Ch 06 3 - Extending the State interface)
  products: ProductState;
}
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

// selector.   Note it's private, no export
const getProductFeatureState = createFeatureSelector<ProductState>('products'); // Ch 6 Ep 6,7 Composing Selectors

export const getShowProductCode = createSelector(
  getProductFeatureState, // the selector we require to retrieve this bit of state
  state => state.showProductCode // projector function.  Gets the results of the projector functions (which in
  // this case the 'products' slice of state) We then manipulate that state to
  // return the desired value (state.showProductCode)
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

// The 1st parameter is the state of the "products" slice from the store
// 2nd parameter is the action to be processed
export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state, // Must clone the "products" slice state first and replace
        // this slice with the new state that contains the new showProductCode value
        showProductCode: action.payload // We update the showProductCode property on the store with the value of the payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload } // the payload is an object so we need to prevent side-effects and clone the payload object
      };
    case ProductActionTypes.InitialiseCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: '',
          description: '',
          starRating: 0
        }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };
    default:
      return state;
  }
}
