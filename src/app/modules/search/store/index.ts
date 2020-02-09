import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SearchModel} from '../search.types';

export const getSearchState = createFeatureSelector<SearchModel>('search');
export const getBikes = createSelector(getSearchState, state => state.bikes);
export const getBikesPins = createSelector(getSearchState, state => state.bikes_coordinates);
export const getLocations = createSelector(getSearchState, state => state.location);
export const getFilterToggle = createSelector(getSearchState, state => state.showFilter);
export const getSortingToggle = createSelector(getSearchState, state => state.showSorting);
export const getFilterPayload = createSelector(getSearchState, state => state.filterPayload);
