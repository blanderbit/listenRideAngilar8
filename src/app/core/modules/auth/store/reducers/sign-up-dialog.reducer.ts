import {HttpErrorResponse} from '@angular/common/http';
import {createReducer, on} from '@ngrx/store';
import {AuthActions, AuthApiActions, BusinessApiActions, SignUpDialogActions} from '@core/modules/auth/store/actions';
import {User} from '@models/user/user';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {Business} from '@models/business/business';
import {SignUpFacebookRequest} from '@models/sign-up/sign-up-facebook-request';

export const signUpDialogFeatureKey = 'signUpDialog';

export interface State {
  signUpRequest: SignUpRequest;
  error: HttpErrorResponse;
  pending: boolean;
  user: User;
  dialogId: string;
  business: Business;
  signUpBusinessPending: boolean;
  signUpBusinessError: HttpErrorResponse;
  signUpFacebookRequest: SignUpFacebookRequest;
  signUpFacebookPending: boolean;
  signUpFacebookError: HttpErrorResponse;
  signUpLoginFacebookPending: boolean;
  signUpLoginFacebookError: HttpErrorResponse;
  signUpLoginPending: boolean;
  signUpLoginError: HttpErrorResponse;
}

export const initialState: State = {
  signUpRequest: null,
  error: null,
  pending: false,
  user: null,
  dialogId: null,
  business: null,
  signUpBusinessPending: false,
  signUpBusinessError: null,
  signUpFacebookRequest: null,
  signUpFacebookPending: false,
  signUpFacebookError: null,
  signUpLoginFacebookPending: false,
  signUpLoginFacebookError: null,
  signUpLoginPending: false,
  signUpLoginError: null
};

export const reducer = createReducer(
  initialState,

  on(SignUpDialogActions.signUp, (state, {signUpRequest}) => ({
    ...state,
    signUpRequest,
    error: null,
    pending: true
  })),

  on(AuthApiActions.signUpSuccess, (state, {user}) => ({
    ...state,
    user,
    error: null,
    pending: false
  })),

  on(AuthApiActions.signUpFailure, (state, {error}) => ({
    ...state,
    error,
    pending: false
  })),

  on(SignUpDialogActions.signUpFacebook, (state, {signUpFacebookRequest}) => ({
    ...state,
    signUpFacebookRequest,
    signUpFacebookError: null,
    signUpFacebookPending: true
  })),

  on(AuthApiActions.signUpFacebookSuccess, (state, {user}) => ({
    ...state,
    user,
    signUpFacebookError: null,
    signUpFacebookPending: false
  })),

  on(AuthApiActions.signUpFacebookFailure, (state, {signUpFacebookError}) => ({
    ...state,
    signUpFacebookError,
    signUpFacebookPending: false
  })),

  on(SignUpDialogActions.signUpLoginFacebook, state => ({
    ...state,
    loginFacebookError: null,
    signUpLoginFacebookPending: true
  })),

  on(AuthApiActions.signUpLoginFacebookSuccess, (state, {tokens}) => ({
    ...state,
    tokens,
    loginFacebookError: null,
    signUpLoginFacebookPending: false
  })),

  on(AuthApiActions.signUpLoginFacebookFailure, (state, {signUpLoginFacebookError}) => ({
    ...state,
    signUpLoginFacebookError,
    signUpLoginFacebookPending: false
  })),

  on(SignUpDialogActions.signUpLogin, state => ({
    ...state,
    signUpLoginError: null,
    signUpLoginPending: true
  })),

  on(AuthApiActions.signUpLoginSuccess, (state, {tokens}) => ({
    ...state,
    tokens,
    signUpLoginError: null,
    signUpLoginPending: false
  })),

  on(AuthApiActions.signUpLoginFailure, (state, {error}) => ({
    ...state,
    signUpLoginError: error,
    signUpLoginPending: false
  })),

  on(BusinessApiActions.createSuccess, (state, {business}) => ({
    ...state,
    business,
    signUpBusinessError: null,
    signUpBusinessPending: false
  })),

  on(BusinessApiActions.createFailure, (state, {error}) => ({
    ...state,
    signUpBusinessError: error,
    signUpBusinessPending: false
  })),

  on(SignUpDialogActions.opened, (state, {dialogId}) => ({
    ...state,
    dialogId,
  })),

  on(SignUpDialogActions.closed, (state) => ({
    ...state,
    dialogId: null,
    error: null,
    pending: false
  })),

  on(AuthActions.logout, (state) => ({
    ...initialState
  })),
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getSignUpFacebookError = (state: State) => state.signUpFacebookError;
export const getSignUpFacebookPending = (state: State) => state.signUpFacebookPending;
export const getSignUpLoginFacebookError = (state: State) => state.signUpLoginFacebookError;
export const getSignUpLoginFacebookPending = (state: State) => state.signUpLoginFacebookPending;
export const getSignUpLoginError = (state: State) => state.signUpLoginError;
export const getSignUpLoginPending = (state: State) => state.signUpLoginPending;
export const getSignUpBusinessError = (state: State) => state.signUpBusinessError;
export const getSignUpBusinessPending = (state: State) => state.signUpBusinessPending;
