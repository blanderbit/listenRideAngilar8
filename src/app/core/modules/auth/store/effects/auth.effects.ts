import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, flatMap, map, mergeMap, take, tap} from 'rxjs/operators';
import {
  AuthActions,
  AuthApiActions,
  BusinessApiActions,
  LoginDialogActions,
  SignUpDialogActions,
  UserApiActions
} from '@core/modules/auth/store/actions';
import {concat, Observable, of} from 'rxjs';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {ApiUserService} from '@api/api-user/api-user.service';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {MatDialog} from '@angular/material/dialog';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import * as fromAuth from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {TokensEnum} from '@enums/tokens.enum';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {BusinessCreateRequest} from '@models/business/business-create-request';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {LocalStorageKeysEnum} from '@enums/local-storage-keys.enum';

@Injectable()
export class AuthEffects {

  setUserDataInitialize$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.UserDataInitialize),
        exhaustMap(({me, user}) =>
          concat(
            of(UserApiActions.getMeSuccess({me})),
            of(UserApiActions.getUserByIdSuccess({user}))
          )
      ))
    }
  );

  saveTokens$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.saveTokens),
        map((action) => {
          try {
            localStorage.setItem(TokensEnum.ACCESS_TOKEN, action.tokens.access_token);
            localStorage.setItem(TokensEnum.REFRESH_TOKEN, action.tokens.refresh_token);
            localStorage.setItem(TokensEnum.TOKEN_TYPE, action.tokens.token_type);

            return AuthActions.saveTokensSuccess();
          } catch (exception) {
            return AuthActions.saveTokensError({exception});
          }
        })
      );
    }
  );

  saveTokensSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.saveTokensSuccess),
        exhaustMap(() =>
          this.apiUserService.me().pipe(
            map(me => UserApiActions.getMeSuccess({me})),
            catchError(error => of(UserApiActions.getMeFailure({error})))
          )
        )
      );
    }
  );

  getMeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getMeSuccess),
        map(({me}) => {
          try {
            localStorage.setItem(LocalStorageKeysEnum.ME, JSON.stringify(me));
            return AuthActions.saveMeSuccess({me});
          } catch (exception) {
            return AuthActions.saveMeError({exception});
          }
        })
      );
    }
  );

  saveMeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.saveMeSuccess),
        exhaustMap(({me}) =>
          this.apiUserService.read(me.id).pipe(
            map(user => UserApiActions.getUserByIdSuccess({user})),
            catchError(error => of(UserApiActions.getMeFailure({error})))
          )
        )
      );
    }
  );

  getUserByIdSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserApiActions.getUserByIdSuccess),
        map(({user}) => {
          try {
            localStorage.setItem(LocalStorageKeysEnum.USER, JSON.stringify(user));
            return AuthActions.saveUserSuccess({user});
          } catch (exception) {
            return AuthActions.saveUserError({exception});
          }
        })
      );
    }
  );

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

  logOut$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.headerLogout),
        tap((action) => {
          localStorage.removeItem(TokensEnum.ACCESS_TOKEN);
          localStorage.removeItem(TokensEnum.REFRESH_TOKEN);
          localStorage.removeItem(TokensEnum.TOKEN_TYPE);
          localStorage.removeItem(LocalStorageKeysEnum.ME);
          localStorage.removeItem(LocalStorageKeysEnum.USER);
        })
      );
    }, {dispatch: false}
  );

  loginDialogOpen$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.headerOpenLoginDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig('400px');
          const dialogRef = this.dialog.open(AuthLoginDialogComponent, dialogConfig);

          return of(dialogRef.id);
        }),
        map(dialogId => LoginDialogActions.opened({dialogId}))
      );
    }
  );

  loginDialogClose$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoginDialogActions.close),
        exhaustMap(() => this.store.pipe(take(1), select(fromAuth.selectLoginDialogState))),
        map((state) => {
          this.dialog.getDialogById(state.dialogId).close();
          return LoginDialogActions.closed();
        })
      );
    }
  );

  signUp$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.signUp),
        map(action => action.signUpRequest),
        exhaustMap((signUpRequest: SignUpRequest) =>
          this.apiUserService.create(signUpRequest).pipe(
            map(user => AuthApiActions.signUpSuccess({user})),
            catchError(error => of(AuthApiActions.signUpFailure({error})))
          )
        )
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
          this.store.dispatch(SignUpDialogActions.signUpLogin({credentials}));
        })
      );
    },
    {dispatch: false}
  );

  signUpLogin$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.signUpLogin),
        map(action => action.credentials),
        exhaustMap((auth: OauthTokenRequest) =>
          this.apiOauthService.token(auth).pipe(
            map(tokens => AuthApiActions.signUpLoginSuccess({tokens})),
            catchError(error => of(AuthApiActions.signUpLoginFailure({error})))
          )
        )
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

  signUpCreateBusiness$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.signUpCreateBusiness),
        map(({signUpRequest}) => {
          const businessCreateRequest: BusinessCreateRequest = {
            business: signUpRequest.business
          };

          return businessCreateRequest;
        }),
        exhaustMap((businessCreateRequest: BusinessCreateRequest) => {
          return this.apiBusinessService.create(businessCreateRequest).pipe(
            map(business => BusinessApiActions.createSuccess({business})),
            catchError(error => of(BusinessApiActions.createFailure({error})))
          );
        })
      );
    }
  );

  signUpBusinessCreateSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BusinessApiActions.createSuccess),
        map(({business}) => {
          // this.store.dispatch(AuthActions.saveTokens({tokens}));
          // localStorage.setItem(TokensEnum.ACCESS_TOKEN, tokens.access_token);
          // localStorage.setItem(TokensEnum.REFRESH_TOKEN, tokens.refresh_token);
          // localStorage.setItem(TokensEnum.TOKEN_TYPE, tokens.token_type);

          return SignUpDialogActions.close();
        })
      );
    }
  );

  signUpDialogOpen$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.headerOpenSignUpDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig();
          const dialogRef = this.dialog.open(AuthSignUpDialogComponent, dialogConfig);

          return of(dialogRef.id);
        }),
        map(dialogId => SignUpDialogActions.opened({dialogId}))
      );
    }
  );

  signUpDialogClose$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.close),
        exhaustMap(() => this.store.pipe(take(1), select(fromAuth.selectSignUpDialogState))),
        map((state) => {
          this.dialog.getDialogById(state.dialogId).close();
          return SignUpDialogActions.closed();
        })
      );
    }
  );

  // signUpBusinessDialogOpen$ = createEffect(() => {
  //     return this.actions$.pipe(
  //       ofType(AuthActions.headerOpenSignUpBusinessDialog),
  //       exhaustMap(() => {
  //         const dialogConfig = new DialogConfig();
  //         const dialogRef = this.dialog.open(AuthSignUpBusinessDialogComponent, dialogConfig);
  //
  //         return of(dialogRef.id);
  //       }),
  //       map(dialogId => LoginDialogActions.opened({dialogId}))
  //     );
  //   }
  // );

  constructor(private actions$: Actions,
              private apiOauthService: ApiOauthService,
              private apiBusinessService: ApiBusinessService,
              private dialog: MatDialog,
              private apiUserService: ApiUserService,
              private store: Store<fromAuth.State>) {

  }

}
