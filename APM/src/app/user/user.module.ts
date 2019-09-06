import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/login.reducer';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', reducer) // We call forFeature method since we adding this code to a feature module.
    // First parameter is the name of the feature slice. 2nd parameter is the
    // set of reducers that create our "user" state
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
