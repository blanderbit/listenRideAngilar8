import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => !!JSON.parse(localStorage.getItem('tokens'))
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
