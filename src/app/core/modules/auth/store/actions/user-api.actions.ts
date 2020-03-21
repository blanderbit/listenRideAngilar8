import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@models/user/user';

export const getMeSuccess = createAction(
  '[User/API] Get Me Success',
  props<{ me: Partial<User> }>(),
);
export const getMeFailure = createAction(
  '[User/API] Get Me Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const getUserByIdSuccess = createAction(
  '[User/API] Get User By Id Success',
  props<{ user: User }>(),
);
export const getUserByIdFailure = createAction(
  '[User/API] Get User By Id Failure',
  props<{ error: HttpErrorResponse }>(),
);
