import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {UserVerificationActions} from '@user-verification/store/actions';

@Injectable({
  providedIn: 'root'
})

export class UserVerificationGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    public router: Router
  ) {
  }

  canActivate(): boolean {
    // debugger;
    if (!this.userVerified()) {
      // this.store.dispatch(UserVerificationActions.openUserVerificationDialogFromGuard());
      return false;
    }

    return true;
  }

  private userVerified(): boolean {
    return false;
  }
}
