// The 1st parameter is the state of the "user" slice from the store
// 2nd parameter is the action to be processed
export function reducer(state, action) {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state, // Must clone the "login" slice state first and replace
                  // this slice with the new state that contains the new showProductCode value
        maskUserName: action.payload  // We update the maskUserName property on the store with the value of the payload
      };
    default:
      return state;
  }
}
