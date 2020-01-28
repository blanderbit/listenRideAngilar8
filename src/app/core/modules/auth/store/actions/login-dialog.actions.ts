import {createAction, props} from '@ngrx/store';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';

export const opened = createAction('[Login Dialog] Opened', props<{ dialogId: any }>());
export const close = createAction('[Login Dialog] Close');
export const closed = createAction('[Login Dialog] Closed');
export const login = createAction('[Login Dialog] Login', props<{ credentials: OauthTokenRequest }>());
