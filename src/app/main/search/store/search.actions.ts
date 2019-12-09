import { createAction, props } from '@ngrx/store';
import { SearchModel } from '../search.types';

export const GetBikes = createAction('[Search] - Get Rides');

export const StartGetBikes = createAction('[Search] - Get Rides started', props<{ location: string }>());

export const SuccessGetBikes = createAction(
  '[Search] - Success Get Rides',
  props<{ payload: SearchModel }>()
);

export const ErrorGetBikes = createAction('[Search] - Error', props<Error>());
