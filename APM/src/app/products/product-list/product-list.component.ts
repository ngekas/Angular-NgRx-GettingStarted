import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) {} // Note: product.reducer file contains the complete State type definition
  // at this point (due to the extended State syntax to handle lazy loading
  // of products module). Chapter 6 4 - Strongly Typing the state

  ngOnInit(): void {
    // old
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());

    this.products$ = this.store
      .pipe(select(fromProduct.getProducts)) as Observable<Product[]>;

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: (err: any) => this.errorMessage = err.error
    // });

    // Now instead of returning the entire 'products' state, we now only need to return the showProductCode property
    // (ie. from products to showProductCode)
    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe(showProductCode => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // old: this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitialiseCurrentProduct());
  }

  productSelected(product: Product): void {
    // old: this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
