import {createAction, props} from '@ngrx/store';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {HttpErrorResponse} from '@angular/common/http';

export const SaveTokens = createAction('[Save Tokens] - Save tokens',
  props<{ tokens: OauthTokenResponse }>());

export const LoginWithCredentials = createAction('[Login] - Login with credentials',
  props<{ credentials: OauthTokenRequest }>());

export const LoginWithCredentialsSuccess = createAction('[Login Success] - Login with credentials success',
  props<{ tokens: OauthTokenResponse }>());

export const LoginWithCredentialsError = createAction('[Login Error] - Login with credentials error',
  props<{ error: HttpErrorResponse }>());

export const LoginFacebook = createAction('[Login Dialog] - Login with facebook');
export const Logout = createAction('[Logout Button] - Logout');
