// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AuthActions, UserApiActions } from '@core/modules/auth/store/actions';
import { of } from 'rxjs';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { ApiUserService } from '@api/api-user/api-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthLoginDialogComponent } from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import { AuthSignUpDialogComponent } from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import { DialogConfig } from '@core/configs/dialog/dialog.config';
import { TokensEnum } from '@enums/tokens.enum';
import { ApiBusinessService } from '@api/api-business/api-business.service';
import { LocalStorageKeysEnum } from '@enums/local-storage-keys.enum';
import { Router } from '@angular/router';
import * as fromAuth from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  loginDialogOpen$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.openLoginDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig('400px');
          const dialogRef = this.dialog.open(
            AuthLoginDialogComponent,
            dialogConfig,
          );

          return of(dialogRef.id);
        }),
      );
    },
    { dispatch: false },
  );
  loginDialogClose$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.closeLoginDialog),
        map(() => this.dialog.closeAll()),
      );
    },
    { dispatch: false },
  );

  signUpDialogOpen$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.openSignUpDialog),
        exhaustMap(() => {
          const dialogConfig = new DialogConfig();
          const dialogRef = this.dialog.open(
            AuthSignUpDialogComponent,
            dialogConfig,
          );

          return of(dialogRef.id);
        }),
      );
    },
    { dispatch: false },
  );

  updateUserByApi$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.updateUserByApi),
      withLatestFrom(this.store.select(fromAuth.selectUser)),
      // eslint-disable-next-line no-empty-pattern
      exhaustMap(([{}, { id }]) =>
        this.apiUserService.read(id).pipe(
          map(user => UserApiActions.getUserByIdSuccess({ user })),
          catchError(error => of(UserApiActions.getUserByIdFailure({ error }))),
        ),
      ),
    );
  });

  logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        map(({ withoutReload }) => {
          localStorage.removeItem(TokensEnum.ACCESS_TOKEN);
          localStorage.removeItem(TokensEnum.REFRESH_TOKEN);
          localStorage.removeItem(TokensEnum.TOKEN_TYPE);
          localStorage.removeItem(LocalStorageKeysEnum.ME);
          localStorage.removeItem(LocalStorageKeysEnum.USER);
          if (!withoutReload) {
            this.router.navigateByUrl('/').then(() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            });
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private apiOauthService: ApiOauthService,
    private apiBusinessService: ApiBusinessService,
    private dialog: MatDialog,
    private apiUserService: ApiUserService,
    private store: Store<fromAuth.State>,
    private router: Router,
  ) {}
}
