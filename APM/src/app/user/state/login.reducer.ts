import * as fromRoot from '../../state/app.state'; // fromRoot is a namespace name

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './login.actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: string;
}
export interface State extends fromRoot.State {
  users: UserState;
}

const initialUserState: UserState = {
  maskUserName: true,
  currentUser: ''
};

// selector.   Note it's private, no export
const getUserFeatureState = createFeatureSelector<UserState>('users'); // Ch 6 Ep 6,7 Composing Selectors

export const getMaskUserName = createSelector(
  getUserFeatureState, // the selector we require to retrieve this bit of state
  state => state.maskUserName // projector function.  Gets the results of the projector functions (which in
  // this case the 'users' slice of state) We then manipulate that state to
  // return the desired value (state.maskUserName)
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

// The 1st parameter is the state of the "user" slice from the store
// 2nd parameter is the action to be processed
export function reducer(
  state = initialUserState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state, // Must clone the "login" slice state first and replace
        // this slice with the new state that contains the new showProductCode value
        maskUserName: action.payload // We update the maskUserName property on the store with the value of the payload
      };
    case UserActionTypes.SetCurrentUser:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
