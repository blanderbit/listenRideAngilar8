import {createFeatureSelector, createSelector} from "@ngrx/store";

export const getSearchState = createFeatureSelector('search');
export const getBikes = createSelector(getSearchState, state => state.bikes);
export const getLocations = createSelector(getSearchState, state => state.locations);
