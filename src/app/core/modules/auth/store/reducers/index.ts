import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginDialog from './login-dialog.reducer';
import * as fromSignUpDialog from './sign-up-dialog.reducer';
import {TokensEnum} from '@enums/tokens.enum';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginDialog.loginDialogFeatureKey]: fromLoginDialog.State;
  [fromSignUpDialog.signUpDialogFeatureKey]: fromSignUpDialog.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginDialog.loginDialogFeatureKey]: fromLoginDialog.reducer,
    [fromSignUpDialog.signUpDialogFeatureKey]: fromSignUpDialog.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(authFeatureKey);

export const selectLoginDialogState = createSelector(
  selectAuthState,
  (state: AuthState) => state[fromLoginDialog.loginDialogFeatureKey]
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => {
    const authToken = localStorage.getItem(TokensEnum.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(TokensEnum.REFRESH_TOKEN);
    const tokenType = localStorage.getItem(TokensEnum.TOKEN_TYPE);

    return !!authToken && !!refreshToken && !!tokenType;
  }
);

export const selectLoginDialogError = createSelector(selectLoginDialogState, fromLoginDialog.getLoginError);
export const selectLoginDialogPending = createSelector(selectLoginDialogState, fromLoginDialog.getLoginPending);

export const selectLoginFacebookError = createSelector(selectLoginDialogState, fromLoginDialog.getLoginFacebookError);
export const selectLoginFacebookPending = createSelector(selectLoginDialogState, fromLoginDialog.getLoginFacebookPending);

export const selectSignUpDialogState = createSelector(selectAuthState, (state: AuthState) => state[fromSignUpDialog.signUpDialogFeatureKey]);
export const selectSignUpDialogError = createSelector(selectSignUpDialogState, fromSignUpDialog.getError);
export const selectSignUpDialogPending = createSelector(selectSignUpDialogState, fromSignUpDialog.getPending);
export const selectSignUpDialogLoginError = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpLoginError);
export const selectSignUpDialogLoginPending = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpLoginPending);

export const selectSignUpFacebookError = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpFacebookError);
export const selectSignUpFacebookPending = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpFacebookPending);
export const selectSignUpLoginFacebookError = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpLoginFacebookError);
export const selectSignUpLoginFacebookPending = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpLoginFacebookPending);

export const selectSignUpBusinessCreateError = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpBusinessError);
export const selectSignUpBusinessCreatePending = createSelector(selectSignUpDialogState, fromSignUpDialog.getSignUpBusinessPending);
export const selectFromAuth = createSelector(selectAuthState, (state: AuthState) => state[fromAuth.statusFeatureKey]);

// TODO: rename selectors
export const selectAuthGetMe = createSelector(selectFromAuth, fromAuth.getMe);
export const selectAuthGetUser = createSelector(selectFromAuth, fromAuth.getUser);
