import { createAction, props } from '@ngrx/store';
import { SearchModel } from '../search.types';

export const GetBikes = createAction('[Search] - Get Bikes');
export const StartGetBikes = createAction('[Search] - Get Bikes started', props<{ location: string }>());
export const SuccessGetBikes = createAction('[Search] - Success Get Bikes',props<{ payload: SearchModel }>());
export const ErrorGetBikes = createAction('[Search] - Error', props<Error>());

export const GetBikesPage = createAction('[Search] - Get Bikes Page', props<{offset: number, limit: number}>());
export const GetBikesPageSuccess = createAction('[Search] - Get Bikes Page Success', props<{ bikes: any }>());


