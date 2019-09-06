import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService,
              private store: Store<any>) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    // subscribe to receive change notifications from the "products" slice within the store
    // every time the state changes, we receive the entire "products" slice
    this.store.pipe(select('products')).subscribe(
      products => {
        if (products) { // need the "if" because when the application is first executed, its state is undefined
          this.displayCode = products.showProductCode;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
