// The 1st parameter is the state of the "products" slice from the store
// 2nd parameter is the action to be processed
export function reducer(state, action) {
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
