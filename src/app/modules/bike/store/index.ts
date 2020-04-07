import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';
import { BikeState } from '../types';

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

export const selectStartDay = createSelector(
  selectBookingData,
  bookingData => bookingData.startDay,
);

export const selectEndDay = createSelector(
  selectBookingData,
  bookingData => bookingData.endDay,
);

export const selectBookingDays = createSelector(
  selectStartDay,
  selectEndDay,
  (startDay, endDay) => ({
    startDate: startDay ? moment(startDay) : undefined,
    endDate: startDay ? moment(endDay) : undefined,
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
