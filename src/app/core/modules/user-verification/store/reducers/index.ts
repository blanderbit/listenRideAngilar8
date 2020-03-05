import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUserVerificationDialog from './user-verification-dialog.reducer';

export const userVerificationFeatureKey = 'userVerification';

export interface UserVerificationState {
  [fromUserVerificationDialog.userVerificationDialogFeatureKey]: fromUserVerificationDialog.State;
}

export interface State {
  [userVerificationFeatureKey]: UserVerificationState;
}

export function reducers(state: UserVerificationState | undefined, action: Action) {
  return combineReducers({
    [fromUserVerificationDialog.userVerificationDialogFeatureKey]: fromUserVerificationDialog.reducer
  })(state, action);
}

export const selectUserVerificationState = createFeatureSelector<State, UserVerificationState>(userVerificationFeatureKey);

export const selectUserVerificationDialogState = createSelector(
  selectUserVerificationState,
  (state: UserVerificationState) => state[fromUserVerificationDialog.userVerificationDialogFeatureKey]
);
