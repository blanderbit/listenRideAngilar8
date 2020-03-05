import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {
  AuthActions,
  AuthApiActions,
  LoginDialogActions,
  SignUpDialogActions,
  UserApiActions
} from '@core/modules/auth/store/actions';
import {of} from 'rxjs';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {ApiUserService} from '@api/api-user/api-user.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {TokensEnum} from '@enums/tokens.enum';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {LocalStorageKeysEnum} from '@enums/local-storage-keys.enum';
import {Router} from '@angular/router';
import * as fromAuth from '@auth/store/reducers';
import {OauthTokenFacebookRequest} from '@models/oauth/oauth-token-facebook-request';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {select, Store} from '@ngrx/store';

@Injectable()
export class AuthEffects {

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

  saveMeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.saveMeSuccess),
        exhaustMap(({me}) =>
          this.apiUserService.read(me.id).pipe(
            map(user => UserApiActions.getUserByIdSuccess({user})),
            catchError(error => of(UserApiActions.getUserByIdFailure({error})))
          )
        )
      );
    }
  );

  loginDialogOpen$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.openLoginDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig('400px');
          const dialogRef = this.dialog.open(AuthLoginDialogComponent, dialogConfig);

          return of(dialogRef.id);
        }),
        map(dialogId => LoginDialogActions.opened({dialogId}))
      );
    }
  );

  signUpDialogOpen$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.openSignUpDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig();
          const dialogRef = this.dialog.open(AuthSignUpDialogComponent, dialogConfig);

          return of(dialogRef.id);
        }),
        map(dialogId => SignUpDialogActions.opened({dialogId}))
      );
    }
  );

  updateUserByApi$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.updateUserByApi),
        withLatestFrom(this.store.select(fromAuth.selectAuthGetUser)),
        exhaustMap(([{}, {id}]) =>
          this.apiUserService.read(id).pipe(
            map(user => UserApiActions.getUserByIdSuccess({user})),
            catchError(error => of(UserApiActions.getUserByIdFailure({error})))
          )
        )
      );
    }
  );

  logOut$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        map((action) => {
          localStorage.removeItem(TokensEnum.ACCESS_TOKEN);
          localStorage.removeItem(TokensEnum.REFRESH_TOKEN);
          localStorage.removeItem(TokensEnum.TOKEN_TYPE);
          localStorage.removeItem(LocalStorageKeysEnum.ME);
          localStorage.removeItem(LocalStorageKeysEnum.USER);
          this.router.navigateByUrl('/').then(() => {
            location.reload();
          });
        })
      );
    }, {dispatch: false}
  );

  constructor(private actions$: Actions,
              private apiOauthService: ApiOauthService,
              private apiBusinessService: ApiBusinessService,
              private dialog: MatDialog,
              private apiUserService: ApiUserService,
              private store: Store<fromAuth.State>,
              private router: Router) {

  }

}
