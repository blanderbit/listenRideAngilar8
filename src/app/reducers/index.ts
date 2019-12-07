import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {SearchReducer} from "../main/search/store/search.reducers";

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  //SearchReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
