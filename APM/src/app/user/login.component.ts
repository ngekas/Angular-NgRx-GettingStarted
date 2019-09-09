import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUsers from './state/login.reducer';
import { UserActionTypes } from './state/login.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;
  currentUser: string;

  constructor(private store: Store<fromUsers.State>,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromUsers.getMaskUserName)).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );

    this.store.pipe(select(fromUsers.getCurrentUser)).subscribe(
      currentUser => this.currentUser = currentUser
    );

  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: UserActionTypes.MaskUserName,
      payload: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      this.store.dispatch({
        type: UserActionTypes.SetCurrentUser,
        payload: userName
      });

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
