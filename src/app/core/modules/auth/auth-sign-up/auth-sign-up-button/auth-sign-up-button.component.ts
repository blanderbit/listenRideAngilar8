import {Component, Input} from '@angular/core';
import {AuthActions} from '@core/modules/auth/store/actions';
import {Store} from '@ngrx/store';
import * as fromAuth from '@core/modules/auth/store/reducers';

@Component({
  selector: 'lnr-auth-sign-up-button',
  templateUrl: './auth-sign-up-button.component.html',
  styleUrls: ['../../button.scss', './auth-sign-up-button.component.scss']
})
export class AuthSignUpButtonComponent {
  @Input() text = 'Sign up';
  @Input() disabled = false;

  constructor(private store: Store<fromAuth.State>) {
  }

  openDialog(): void {
    this.store.dispatch(AuthActions.headerOpenSignUpDialog());
  }

}
