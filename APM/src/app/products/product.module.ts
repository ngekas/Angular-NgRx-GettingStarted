import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';

const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', reducer) // We call forFeature method since we adding this code to a feature module.
                                           // First parameter is the name of the feature slice. 2nd parameter is the
                                           // set of reducers that create our "product" state
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
