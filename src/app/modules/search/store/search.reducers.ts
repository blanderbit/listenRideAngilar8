import {Action, createReducer, on} from '@ngrx/store';
import * as SearchActions from './search.actions';
import {SearchModel, SearchPayload} from '../search.types';

export const initialState: SearchModel = {
  bikes: [],
  location: [],
  bikes_coordinates: [],
  showFilter: false,
  showSorting: false
};

export const initialSearchPayload: SearchPayload = {
  page: 1,
  limit: 21,
};

const reducer = createReducer(
  initialState,
  on(SearchActions.SuccessGetBikes, (state: SearchModel, payload) => {
    return {...state, ...payload};
  }),
  on(SearchActions.ErrorGetBikes, (state: SearchModel, error: Error) => {
    console.log(error);
    return {...state, error};
  }),

  on(SearchActions.GetBikesPageSuccess, (state: SearchModel, payload) => {
    const nextState = {...state};
    nextState.bikes = [...nextState.bikes, ...payload.bikes];
    return nextState;
  }),

  on(SearchActions.setSearchFilterToggle, (state: SearchModel, payload) => {
    return {...state, ...payload};
  }),
  on(SearchActions.setSearchSortingToggle, (state: SearchModel, payload) => {
    return {...state, ...payload};
  }),
  on(SearchActions.SetSearchPayload, (state: SearchModel, payload) => {
    const nextState = {...state};
    const filterPayload = {} as SearchPayload;

    Object.keys(payload).forEach( (key) => {
      if (!!payload[key] && key !== 'type') {
        filterPayload[key] = payload[key];
      }
    });

    nextState.filterPayload = {...nextState.filterPayload, ...filterPayload};
    return nextState;
  }),
  on(SearchActions.ResetSearchPayload, (state: SearchModel) => {
    const nextState = {...state};
    nextState.filterPayload = {location: nextState.filterPayload.location, ...initialSearchPayload};
    return nextState;
  })
);

export function SearchReducer(state: SearchModel = initialState, action: Action) {
  return reducer(state, action);
}
