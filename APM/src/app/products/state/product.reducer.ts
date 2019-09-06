import { Product } from '../product';
import * as fromRoot from '../../state/app.state';  // fromRoot is a namespace name
import { createFeatureSelector, createSelector } from '@ngrx/store';

// tslint:disable-next-line: max-line-length
export interface State extends fromRoot.State { // This is needed as products module is lazy loaded (Ch 06 3 - Extending the State interface)
  products: ProductState;
}
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
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

// The 1st parameter is the state of the "products" slice from the store
// 2nd parameter is the action to be processed
export function reducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state, // Must clone the "products" slice state first and replace
                  // this slice with the new state that contains the new showProductCode value
        showProductCode: action.payload  // We update the showProductCode property on the store with the value of the payload
      };
    default:
      return state;
  }
}
