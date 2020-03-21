import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BikesState } from '../types';

export const bikesFeatureKey = 'Bikes';

export const selectBikesState = createFeatureSelector<BikesState>(
  bikesFeatureKey,
);

export const selectCurrentBikeData = createSelector(
  selectBikesState,
  (state: BikesState) => state.currentBike.bikeData,
);
