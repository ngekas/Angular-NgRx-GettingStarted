import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitialiseCurrentProduct = '[Product] Initialise Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail'
}

// Action Creator - Ch 7 Ep 3 - Demo: Building Action Creators
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;

  // no constructor and no payload.  This action will set the currently selected product to null...therefore we don't pass
  // a null in the payload.  The action will trigger to reducer to just set the currentProduct property
  // in the store to null
  // Typescript will provide an empty constructor automatically if one is not defined
}

export class InitialiseCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitialiseCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

// Union type - strongly type all of our actions.  We read the pipe as an "or"
export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitialiseCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail;
