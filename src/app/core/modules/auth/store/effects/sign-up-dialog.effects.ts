import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, take} from 'rxjs/operators';
import {AuthApiActions, BusinessApiActions, SignUpDialogActions} from '@core/modules/auth/store/actions';
import {of} from 'rxjs';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {ApiUserService} from '@api/api-user/api-user.service';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {MatDialog} from '@angular/material/dialog';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import * as fromAuth from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {BusinessCreateRequest} from '@models/business/business-create-request';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {Router} from '@angular/router';

@Injectable()
export class SignUpDialogEffects {

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

  signUpFacebook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.signUpFacebook),
        exhaustMap(({signUpFacebookRequest}) => {
            return this.apiUserService.create(signUpFacebookRequest).pipe(
              map(user => AuthApiActions.signUpFacebookSuccess({user})),
              catchError(signUpFacebookError => of(AuthApiActions.signUpFacebookFailure({signUpFacebookError})))
            );
          }
        )
      );
    }
  );

  signUpLoginFacebook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.signUpLoginFacebook),
        exhaustMap(({oauthTokenFacebookRequest}) =>
          this.apiOauthService.token(oauthTokenFacebookRequest).pipe(
            map(tokens => AuthApiActions.signUpLoginFacebookSuccess({tokens})),
            catchError(signUpLoginFacebookError => of(AuthApiActions.signUpLoginFacebookFailure({signUpLoginFacebookError})))
          )
        )
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

  signUpDialogClose$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SignUpDialogActions.close),
        exhaustMap(() => this.store.pipe(take(1), select(fromAuth.selectSignUpDialogState))),
        map((state) => {
          const dialog = this.dialog.getDialogById(state.dialogId);
          if (dialog) {
            dialog.close();
          }
          return SignUpDialogActions.closed();
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
