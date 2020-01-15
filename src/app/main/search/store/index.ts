import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SearchModel} from '../search.types';

export const getSearchState = createFeatureSelector<SearchModel>('search');
export const getBikes = createSelector(getSearchState, state => state.bikes);
export const getFilteredBikes = createSelector(getSearchState, state => state.filteredBikes);
export const getDisplayBikes = createSelector(getSearchState, state => state.displayBikes);
export const getLocations = createSelector(getSearchState, state => state.location);
export const getFilterToggle = createSelector(getSearchState, state => state.showFilter);
