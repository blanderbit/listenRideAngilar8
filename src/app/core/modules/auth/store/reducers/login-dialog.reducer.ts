import {createReducer, on} from '@ngrx/store';
import {AuthActions, AuthApiActions, LoginDialogActions} from '@core/modules/auth/store/actions';
import {HttpErrorResponse} from '@angular/common/http';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';

export const loginDialogFeatureKey = 'loginDialog';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
  tokens: OauthTokenResponse | null;
  dialogId: string;
}

export const initialState: State = {
  error: null,
  pending: false,
  tokens: null,
  dialogId: null
};

export const reducer = createReducer(
  initialState,
  on(LoginDialogActions.login, state => ({
    ...state,
    error: null,
    pending: true
  })),

  on(AuthActions.headerLogout, state => ({
    ...initialState
  })),

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
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
