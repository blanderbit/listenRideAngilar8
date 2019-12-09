import { Action, createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchModel } from '../search.types';

export const initialState: SearchModel = {
  bikes: [],
  location: []
};

const reducer = createReducer(
  initialState,
  on(SearchActions.GetBikes, state => state),
  on(SearchActions.SuccessGetBikes, (state: SearchModel,  payload ) => {
    return { ...state, ...payload };
  }),
  on(SearchActions.ErrorGetBikes, (state: SearchModel, error: Error) => {
    console.log(error);
    return { ...state, error: error };
  })
);

export function SearchReducer(state: SearchModel = initialState, action: Action) {
  return reducer(state, action);
}
