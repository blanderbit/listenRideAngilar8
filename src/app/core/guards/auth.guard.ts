import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokensEnum} from '@enums/tokens.enum';
import {Store} from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import {AuthActions} from '@auth/store/actions';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    public router: Router
  ) {
  }

  canActivate(): boolean {
    const access = localStorage.getItem(TokensEnum.ACCESS_TOKEN);

    if (!access) {
      this.store.dispatch(AuthActions.openLoginDialog());
      return false;
    }

    return true;
  }
}
