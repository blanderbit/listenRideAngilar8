import {createAction, props} from '@ngrx/store';
import {SearchModel, SearchPayload, SearchMetaData} from '../search.types';

export const GetBikes = createAction('[Search] - Get Bikes');
export const SuccessGetBikes = createAction('[Search] - Success Get Bikes', props<{ payload: SearchModel }>());
export const ErrorGetBikes = createAction('[Search] - Error', props<Error>());

export const GetBikesPage = createAction('[Search] - Get Bikes Page', props<{ bikes: any[] }>());
export const GetBikesPageSuccess = createAction('[Search] - Get Bikes Page Success', props<{ bikes: any }>());

export const setSearchFilterToggle = createAction('[Search] Toggle Filters', props<{ showFilter: boolean }>());
export const setSearchSortingToggle = createAction('[Search] Toggle Sorting', props<{ showSorting: boolean }>());

export const setSearchLoading = createAction('[Search] Set loading state', props<{ loading: boolean }>());

export const SetSearchPayload = createAction('[Search] Set filter payload', props<SearchPayload>());
export const ResetSearchPayload = createAction('[Search] Reset filter payload');

export const SetSearchMetaData = createAction('[Search] Set metadata', props<{metaData: SearchMetaData}>());
export const ResetSearchMetaData = createAction('[Search] Reset metadata');
