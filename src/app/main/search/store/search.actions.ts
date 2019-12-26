import { createAction, props } from '@ngrx/store';
import { SearchModel } from '../search.types';

export const GetBikes = createAction('[Search] - Get Bikes');
export const StartGetBikes = createAction('[Search] - Get Bikes started', props<{ location?: string,  categories?: string, sizes?: string }>());
export const SuccessGetBikes = createAction('[Search] - Success Get Bikes',props<{ payload: SearchModel }>());
export const ErrorGetBikes = createAction('[Search] - Error', props<Error>());

export const GetUnavailableBikes = createAction('[Search] - Get Unavailable Bikes', props<{startDate: Date, duration: number}>());
export const SuccessGetUnavailableBikes = createAction('[Search] - Get Unavailable Bikes Success', props<{ filteredBikes: any}>());
export const ErrorGetUnavailableBikes = createAction('[Search] - Error Get unavailable bikes', props<Error>());

export const GetBikesPage = createAction('[Search] - Get Bikes Page', props<{offset: number, limit: number}>());
export const GetBikesPageSuccess = createAction('[Search] - Get Bikes Page Success', props<{ bikes: any }>());


