import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(   // action observable.  listens for all actions being emitted
    ofType(productActions.ProductActionTypes.Load),  // just listed to actions of type: productActions.ProductActionTypes.Load
    mergeMap((action: productActions.Load) => // mergeMap - for every emitted "Action", do the folllowing...
      this.productService
        .getProducts() // getProducts observable...listen to products being retrieved
        .pipe(
          map((products: Product[]) => new productActions.LoadSuccess(products)),
          catchError(err => of(new productActions.LoadFail(err))) // catchError doesn't return an observable,
                                                                  // hence the required to use "of" operator
        )
    )
  );
}
