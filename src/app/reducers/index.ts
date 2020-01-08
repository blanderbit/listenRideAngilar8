import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {SearchReducer} from '../main/search/store/search.reducers';

// tslint:disable-next-line:no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {
  // SearchReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
