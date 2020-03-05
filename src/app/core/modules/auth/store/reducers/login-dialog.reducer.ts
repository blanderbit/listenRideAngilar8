import {createReducer, on} from '@ngrx/store';
import {AuthActions, AuthApiActions, LoginDialogActions} from '@core/modules/auth/store/actions';
import {HttpErrorResponse} from '@angular/common/http';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';

export const loginDialogFeatureKey = 'loginDialog';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
  tokens: OauthTokenResponse;
  dialogId: string;
  loginFacebookPending: boolean;
  loginFacebookError: HttpErrorResponse;
}

export const initialState: State = {
  error: null,
  pending: false,
  tokens: null,
  dialogId: null,
  loginFacebookPending: false,
  loginFacebookError: null
};

export const reducer = createReducer(
  initialState,

  on(LoginDialogActions.opened, (state, {dialogId}) => ({
    ...state,
    dialogId,
  })),

  on(LoginDialogActions.closed, (state) => ({
    ...state,
    dialogId: null,
    error: null,
    pending: false
  })),

  on(LoginDialogActions.login, state => ({
    ...state,
    error: null,
    pending: true
  })),

  on(AuthApiActions.loginSuccess, (state, {tokens}) => ({
    ...state,
    tokens,
    error: null,
    pending: false
  })),

  on(AuthApiActions.loginFailure, (state, {error}) => ({
    ...state,
    error,
    pending: false
  })),

  on(AuthApiActions.loginFacebookSuccess, (state, {tokens}) => ({
    ...state,
    tokens,
    loginFacebookError: null,
    loginFacebookPending: false
  })),

  on(AuthApiActions.loginFacebookFailure, (state, {loginFacebookError}) => ({
    ...state,
    loginFacebookError,
    loginFacebookPending: false
  })),

  on(AuthActions.logout, (state) => ({
    ...initialState
  })),
);

export const getLoginError = (state: State) => state.error;
export const getLoginPending = (state: State) => state.pending;
export const getLoginFacebookError = (state: State) => state.loginFacebookError;
export const getLoginFacebookPending = (state: State) => state.loginFacebookPending;
