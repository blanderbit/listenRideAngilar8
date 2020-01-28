import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLoginDialog from './login-dialog.reducer';
import * as fromSignUpDialog from './sign-up-dialog.reducer';
import * as fromSignUpBusinessDialog from './sign-up-business-dialog.reducer';
import {TokensEnum} from '@enums/tokens.enum';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginDialog.loginDialogFeatureKey]: fromLoginDialog.State;
  [fromSignUpDialog.signUpDialogFeatureKey]: fromSignUpDialog.State;
  [fromSignUpBusinessDialog.signUpBusinessDialogFeatureKey]: fromSignUpBusinessDialog.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginDialog.loginDialogFeatureKey]: fromLoginDialog.reducer,
    [fromSignUpDialog.signUpDialogFeatureKey]: fromSignUpDialog.reducer,
    [fromSignUpBusinessDialog.signUpBusinessDialogFeatureKey]: fromSignUpBusinessDialog.reducer,
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

export const selectLoginDialogError = createSelector(
  selectLoginDialogState,
  fromLoginDialog.getError
);

export const selectLoginDialogPending = createSelector(
  selectLoginDialogState,
  fromLoginDialog.getPending
);

export const selectSignUpDialogState = createSelector(
  selectAuthState,
  (state: AuthState) => state[fromSignUpDialog.signUpDialogFeatureKey]
);

export const selectSignUpDialogError = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getError
);

export const selectSignUpDialogPending = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getPending
);

export const selectSignUpDialogLoginError = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getSignUpLoginError
);

export const selectSignUpDialogLoginPending = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getSignUpLoginPending
);

export const selectSignUpBusinessCreateError = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getSignUpBusinessCreateError
);

export const selectSignUpBusinessCreatePending = createSelector(
  selectSignUpDialogState,
  fromSignUpDialog.getSignUpBusinessCreatePending
);
