import {Action, createReducer, on} from '@ngrx/store';
import * as SearchActions from './search.actions';
import {SearchMetaData, SearchModel, SearchPayload} from '../search.types';

export const initialSearchPayload: SearchPayload = {
};

export const initialSearchMetadata: SearchMetaData = {
  page: 1,
  limit: 21,
};

export const initialState: SearchModel = {
  bikes: [],
  location: [],
  bikes_coordinates: [],
  showFilter: false,
  showSorting: false,
  metaData: initialSearchMetadata,
  loading: false
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
  on(SearchActions.setSearchLoading, (state: SearchModel, payload) => {
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

    nextState.filterPayload = {...filterPayload};
    return nextState;
  }),
  on(SearchActions.ResetSearchPayload, (state: SearchModel) => {
    const nextState = {...state};
    nextState.filterPayload = initialSearchPayload;
    return nextState;
  }),
  on(SearchActions.SetSearchMetaData, (state: SearchModel, payload) => {
    const nextState = {...state};
    console.log(payload.metaData);

    const searchMetaData = {} as SearchMetaData;

    Object.keys(payload.metaData).forEach( (key) => {
      if (!!payload.metaData[key]) {
        searchMetaData[key] = payload.metaData[key];
      }
    });

    nextState.metaData = {...nextState.metaData, ...searchMetaData};
    return nextState;
  }),
  on(SearchActions.ResetSearchMetaData, (state: SearchModel) => {
    const nextState = {...state};
    nextState.metaData = initialSearchMetadata;
    return nextState;
  })
);

export function SearchReducer(state: SearchModel = initialState, action: Action) {
  return reducer(state, action);
}
