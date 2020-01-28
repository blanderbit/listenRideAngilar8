import {createAction, props} from '@ngrx/store';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';

export const opened = createAction('[Sign Up Dialog] Opened', props<{ dialogId: any }>());
export const close = createAction('[Sign Up Dialog] Close');
export const closed = createAction('[Sign Up Dialog] Closed');

export const signUp = createAction('[Sign Up Dialog] Sign Up', props<{ signUpRequest: SignUpRequest }>());
export const signUpLogin = createAction('[Sign Up Dialog] Login', props<{ credentials: OauthTokenRequest }>());
export const signUpCreateBusiness = createAction('[Sign Up Dialog] Create Business Profile', props<{ signUpRequest: SignUpRequest }>());
