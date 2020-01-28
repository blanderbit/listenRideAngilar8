import {createAction, props} from '@ngrx/store';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {User} from '@models/user/user';

export const saveTokens = createAction('[Auth] Save Tokens', props<{ tokens: OauthTokenResponse }>());
export const saveTokensSuccess = createAction('[Auth] Save Tokens Success');
export const saveTokensError = createAction('[Auth] Save Tokens Error', props<{ exception: any }>());

export const saveMeSuccess = createAction('[Auth] Save Me Success', props<{ me: Partial<User> }>());
export const saveMeError = createAction('[Auth] Save Me Error', props<{ exception: any }>());

export const saveUserSuccess = createAction('[Auth] Save User Success', props<{ user: User }>());
export const saveUserError = createAction('[Auth] Save User Error', props<{ exception: any }>());

export const headerOpenLoginDialog = createAction('[Header] Open Login Dialog');
export const headerLogout = createAction('[Header] Log Out');

export const headerOpenSignUpDialog = createAction('[Header] Open Sign Up Dialog');

export const headerOpenSignUpBusinessDialog = createAction('[Header] Open Sign Up Business Dialog');
