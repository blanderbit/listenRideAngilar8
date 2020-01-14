import {createReducer, on} from '@ngrx/store';
import {AuthActions} from '@core/modules/auth/store/actions';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {User} from '@models/user/user';

export interface AuthState {
  tokens: OauthTokenResponse;
  user: User;
}

export const initialAuthState: AuthState = {
  tokens: undefined,
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.SaveTokens, (state, action) => {
    return {
      tokens: action.tokens
    };
  }),

  on(AuthActions.Logout, (state, action) => {
    return {
      tokens: undefined
    };
  })
);

