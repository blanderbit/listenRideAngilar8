import {HttpErrorResponse} from '@angular/common/http';
import {createReducer, on} from '@ngrx/store';
import {AuthApiActions, BusinessApiActions, SignUpDialogActions} from '@core/modules/auth/store/actions';
import {User} from '@models/user/user';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {Business} from '@models/business/business';

export const signUpDialogFeatureKey = 'signUpDialog';

export interface State {
  signUpRequest: SignUpRequest;
  error: HttpErrorResponse;
  pending: boolean;
  user: User;
  dialogId: string;
  loginPending: boolean;
  loginError: HttpErrorResponse;
  business: Business;
  businessCreatePending: boolean;
  businessCreateError: HttpErrorResponse;
}

export const initialState: State = {
  signUpRequest: null,
  error: null,
  pending: false,
  user: null,
  dialogId: null,
  loginPending: false,
  loginError: null,
  business: null,
  businessCreatePending: false,
  businessCreateError: null
};

export const reducer = createReducer(
  initialState,
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

  on(SignUpDialogActions.signUp, (state, {signUpRequest}) => ({
    ...state,
    signUpRequest,
    error: null,
    pending: true
  })),

  on(SignUpDialogActions.signUpLogin, state => ({
    ...state,
    loginError: null,
    loginPending: true
  })),

  on(AuthApiActions.signUpLoginSuccess, (state, {tokens}) => ({
    ...state,
    tokens,
    loginError: null,
    loginPending: false
  })),

  on(AuthApiActions.signUpLoginFailure, (state, {error}) => ({
    ...state,
    loginError: error,
    loginPending: false
  })),

  on(BusinessApiActions.createSuccess, (state, {business}) => ({
    ...state,
    business,
    businessCreateError: null,
    businessCreatePending: false
  })),

  on(BusinessApiActions.createFailure, (state, {error}) => ({
    ...state,
    businessCreateError: error,
    businessCreatePending: false
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
);

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getSignUpLoginError = (state: State) => state.loginError;
export const getSignUpLoginPending = (state: State) => state.loginPending;
export const getSignUpBusinessCreateError = (state: State) => state.loginError;
export const getSignUpBusinessCreatePending = (state: State) => state.loginPending;
