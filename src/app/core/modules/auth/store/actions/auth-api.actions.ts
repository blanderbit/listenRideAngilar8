import {createAction, props} from '@ngrx/store';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '@models/user/user';

export const loginSuccess = createAction('[Auth/API] Login Success', props<{ tokens: OauthTokenResponse }>());
export const loginFailure = createAction('[Auth/API] Login Failure', props<{ error: HttpErrorResponse }>());

export const signUpSuccess = createAction('[Auth/API] Sign Up Success', props<{ user: User }>());
export const signUpFailure = createAction('[Auth/API] Sign Up Failure', props<{ error: HttpErrorResponse }>());
export const signUpLoginSuccess = createAction('[Auth/API] Sign Up Login Success', props<{ tokens: OauthTokenResponse }>());
export const signUpLoginFailure = createAction('[Auth/API] Sign Up Login Failure', props<{ error: HttpErrorResponse }>());


