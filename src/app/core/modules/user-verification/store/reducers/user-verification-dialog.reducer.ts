import { createReducer, on } from '@ngrx/store';
import { UserVerificationDialogActions } from '@core/modules/user-verification/store/actions';

export const userVerificationDialogFeatureKey = 'userVerificationDialog';

export interface State {
  dialogId: string;
}

export const initialState: State = {
  dialogId: null,
};

export const reducer = createReducer(
  initialState,
  on(UserVerificationDialogActions.opened, (state, { dialogId }) => ({
    ...state,
    dialogId,
  })),

  on(UserVerificationDialogActions.closed, state => ({
    ...state,
    dialogId: null,
  })),
);
