import {User} from '@models/user/user';
import {createReducer, on} from '@ngrx/store';
import {AuthActions, UserApiActions} from '@auth/store/actions';

export const statusFeatureKey = 'status';

export interface State {
  me: Partial<User>;
  user: User;
}

export const initialState: State = {
  me: null,
  user: null
};

export const reducer = createReducer(
  initialState,
  on(UserApiActions.getMeSuccess, (state, {me}) => ({
    ...state,
    me
  })),
  on(UserApiActions.getUserByIdSuccess, (state, {user}) => ({
    ...state,
    user
  })),
  on(AuthActions.updateUser, (state, {user}) => ({
    ...state,
    user
  })),
  on(AuthActions.logout, (state) => ({
    ...initialState
  })),
);

export const getMe = (state: State) => state.me;
export const getUser = (state: State) => state.user;
// export const getUserCombine = (state: State | any) => [state.me, state.user];
