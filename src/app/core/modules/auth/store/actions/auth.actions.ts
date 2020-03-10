import {createAction, props} from '@ngrx/store';
import {User} from '@models/user/user';

export const saveMeSuccess = createAction('[Auth] Save Me Success', props<{ me: Partial<User> }>());
export const saveMeError = createAction('[Auth] Save Me Error', props<{ exception: any }>());

export const saveUserSuccess = createAction('[Auth] Save User Success', props<{ user: User }>());
export const saveUserError = createAction('[Auth] Save User Error', props<{ exception: any }>());

export const openLoginDialog = createAction('[Auth] Open Login Dialog');
export const openSignUpDialog = createAction('[Auth] Open Sign Up Dialog');

export const updateUser = createAction('[Auth] Update User', props<{ user: User }>());
export const updateUserByApi = createAction('[Auth] Update User By Api');

export const logout = createAction('[Auth] Log Out');
