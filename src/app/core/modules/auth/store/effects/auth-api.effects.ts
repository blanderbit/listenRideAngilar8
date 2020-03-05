import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map, mergeMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {AuthActions, AuthApiActions, LoginDialogActions, SignUpDialogActions} from '@core/modules/auth/store/actions';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {ApiUserService} from '@api/api-user/api-user.service';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {MatDialog} from '@angular/material/dialog';
import * as fromAuth from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {OauthTokenFacebookRequest} from '@models/oauth/oauth-token-facebook-request';
import {Router} from '@angular/router';

@Injectable()
export class AuthApiEffects {

  loginSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        map(({tokens}) => {
          this.store.dispatch(AuthActions.saveTokens({tokens}));
          return LoginDialogActions.close();
        })
      );
    }
  );

  loginFacebookSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.loginFacebookSuccess),
        tap(({tokens}) => {
          this.store.dispatch(AuthActions.saveTokens({tokens}));
        }),
        map(({tokens}) => {
          return LoginDialogActions.close();
        })
      );
    }
  );

  signUpSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signUpSuccess),
        exhaustMap(() => this.store.pipe(take(1), select(fromAuth.selectSignUpDialogState))),
        map((state) => {
          const credentials: OauthTokenRequest = {
            email: state.signUpRequest.user.email,
            password: state.signUpRequest.user.password,
            grant_type: OauthGrantTypeEnum.PASSWORD
          };
          return SignUpDialogActions.signUpLogin({credentials});
        })
      );
    }
  );

  signUpLoginSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signUpLoginSuccess),
        tap(({tokens}) => {
          this.store.dispatch(AuthActions.saveTokens({tokens}));
        }),
        mergeMap(() => this.store.pipe(take(1), select(fromAuth.selectSignUpDialogState))),
        map(({signUpRequest}) => {
          if (signUpRequest.is_shop) {
            return SignUpDialogActions.signUpCreateBusiness({signUpRequest});
          } else {
            return SignUpDialogActions.close();
          }
        })
      );
    }
  );

  signUpFacebookSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signUpFacebookSuccess),
        withLatestFrom(this.store.select(fromAuth.selectSignUpDialogState)),
        map(([{user}, {signUpFacebookRequest}]) => {
          const oauthTokenFacebookRequest: OauthTokenFacebookRequest = {
            assertion: signUpFacebookRequest.user.facebook_access_token,
            grant_type: OauthGrantTypeEnum.ASSERTION
          };
          return SignUpDialogActions.signUpLoginFacebook({oauthTokenFacebookRequest});
        })
      );
    }
  );

  signUpLoginFacebookSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signUpLoginFacebookSuccess),
        tap(({tokens}) => {
          this.store.dispatch(AuthActions.saveTokens({tokens}));
        }),
        map(({tokens}) => {
          return SignUpDialogActions.close();
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
