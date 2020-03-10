import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {TokensEnum} from '@enums/tokens.enum';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export interface State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => {
    const authToken = localStorage.getItem(TokensEnum.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(TokensEnum.REFRESH_TOKEN);
    const tokenType = localStorage.getItem(TokensEnum.TOKEN_TYPE);

    return !!authToken && !!refreshToken && !!tokenType;
  }
);

export const selectFromAuth = createSelector(selectAuthState, (state: AuthState) => state[fromAuth.statusFeatureKey]);

export const selectMe = createSelector(selectFromAuth, fromAuth.getMe);
export const selectUser = createSelector(selectFromAuth, fromAuth.getUser);
