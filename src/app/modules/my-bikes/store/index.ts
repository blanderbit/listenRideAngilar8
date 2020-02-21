import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MyBikesState} from '../my-bikes.types';

export const getMyBikesState = createFeatureSelector<MyBikesState>('myBikes');
export const getBikes = createSelector(getMyBikesState, state => state.bikes);
export const getSelectedBikes = createSelector(getMyBikesState, state => state.selectedBikes);
export const getLoadingState = createSelector(getMyBikesState, state => state.loading);
