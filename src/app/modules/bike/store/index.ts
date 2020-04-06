import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BikeState, BookingData } from '../types';

export const BIKE_FEATURE = 'Bike';

export const selectBikeState = createFeatureSelector<BikeState>(BIKE_FEATURE);

export const selectCurrentBikeData = createSelector(
  selectBikeState,
  (state: BikeState) => {
    return state.bikeData;
  },
);

export const selectBookingData = createSelector(
  selectBikeState,
  (state: BikeState) => state.bookingData,
);

export const selectBookingDays = createSelector(
  selectBookingData,
  ({ startDay, endDay }: BookingData) => ({
    startDate: startDay,
    endDate: endDay,
  }),
);

export const selectEngagedTime = createSelector(
  selectBikeState,
  ({ engagedHoursByDay, engagedDays }: BikeState) => ({
    engagedHoursByDay,
    engagedDays,
  }),
);

export const selectLoadingData = createSelector(
  selectBikeState,
  state => state.loadingData,
);

export const selectIsLoading = createSelector(
  selectLoadingData,
  loadingData => !!loadingData.length,
);
