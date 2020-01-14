import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthActions} from '@core/modules/auth/store/actions';
import {of} from 'rxjs';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {
  LoginWithCredentialsError,
  LoginWithCredentialsSuccess,
  SaveTokens
} from '@core/modules/auth/store/actions/auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(AuthActions.LoginWithCredentials),
          switchMap((action) => {
              return this.apiOauthService.token(action.credentials)
                .pipe(
                  switchMap(tokens => {
                    return of(SaveTokens({tokens}));
                  }),
                  catchError((error) => of(LoginWithCredentialsError(error)))
                );
            }
          )
        )
    ,
    {dispatch: false});

  saveTokens$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(AuthActions.SaveTokens),
          tap(action => localStorage.setItem('tokens',
            JSON.stringify(action.tokens))
          )
        )
    ,
    {dispatch: false});

  logout$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(AuthActions.Logout),
          tap(action => {
            localStorage.removeItem('tokens');
          })
        )
    , {dispatch: false});


  constructor(private actions$: Actions,
              private apiOauthService: ApiOauthService,
              private router: Router) {

  }

}
