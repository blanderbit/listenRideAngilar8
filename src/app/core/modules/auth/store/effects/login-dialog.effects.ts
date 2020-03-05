import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, take} from 'rxjs/operators';
import {AuthApiActions, LoginDialogActions} from '@core/modules/auth/store/actions';
import {of} from 'rxjs';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {ApiUserService} from '@api/api-user/api-user.service';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {Router} from '@angular/router';

@Injectable()
export class LoginDialogEffects {

  login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoginDialogActions.login),
        map(action => action.credentials),
        exhaustMap((auth: OauthTokenRequest) =>
          this.apiOauthService.token(auth).pipe(
            map(tokens => AuthApiActions.loginSuccess({tokens})),
            catchError(error => of(AuthApiActions.loginFailure({error})))
          )
        )
      );
    }
  );

  loginFacebook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoginDialogActions.loginFacebook),
        exhaustMap(({oauthTokenFacebookRequest}) =>
          this.apiOauthService.token(oauthTokenFacebookRequest).pipe(
            map(tokens => AuthApiActions.loginFacebookSuccess({tokens})),
            catchError(loginFacebookError => of(AuthApiActions.loginFacebookFailure({loginFacebookError})))
          )
        )
      );
    }
  );

  loginDialogClose$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoginDialogActions.close),
        exhaustMap(() => this.store.pipe(take(1), select(fromAuth.selectLoginDialogState))),
        map((state) => {
          const dialog = this.dialog.getDialogById(state.dialogId);
          if (dialog) {
            dialog.close();
          }
          return LoginDialogActions.closed();
        })
      );
    }
  );

  constructor(private actions$: Actions,
              private apiOauthService: ApiOauthService,
              private apiBusinessService: ApiBusinessService,
              private dialog: MatDialog,
              private apiUserService: ApiUserService,
              private router: Router,
              private store: Store<fromAuth.State>) {

  }

}
