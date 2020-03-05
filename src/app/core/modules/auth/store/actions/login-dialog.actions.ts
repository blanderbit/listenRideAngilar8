import {createAction, props} from '@ngrx/store';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {OauthTokenFacebookRequest} from '@models/oauth/oauth-token-facebook-request';

export const opened = createAction('[Login Dialog] Opened', props<{ dialogId: any }>());
export const close = createAction('[Login Dialog] Close');
export const closed = createAction('[Login Dialog] Closed');

export const login = createAction('[Login Dialog] Login', props<{ credentials: OauthTokenRequest }>());

export const loginFacebook = createAction('[Login Dialog] Login Facebook', props<{ oauthTokenFacebookRequest: OauthTokenFacebookRequest }>());
