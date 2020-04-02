import { createAction, props } from '@ngrx/store';
import { ExpandedBikeData } from '@models/bike/bike.types';
import { DatesRange } from '../../bike-booking-widget/types';

export const enum BikeActionTypes {
  SET_BIKE = '[BIKE] - Set Bike',
  LOAD_BIKE = '[BIKE] - Load Bike',
  SET_ERROR = '[BIKE] - Set Error',
  SET_SELECTED_DATES = '[BIKE] - Set Selected Dates',
  SET_SELECTED_HOURS = '[BIKE] - Set Selected Hours',
  SET_AVAILABLE_VARIATIONS = '[BIKE] - Set Available Variations',
  SET_BIKE_FROM_VARIATIONS = '[BIKE] - Set Bike From Variations',
  SET_IS_PREMIUM_INSURANCE_ENABLED = '[BIKE] - Set Is Premium Insurance Enabled',
}

export const loadBike = createAction(
  BikeActionTypes.LOAD_BIKE,
  props<{ bikeId: string }>(),
);

export const setBike = createAction(
  BikeActionTypes.SET_BIKE,
  props<{ bikeData: ExpandedBikeData }>(),
);

export const setErrorGetBike = createAction(
  BikeActionTypes.SET_ERROR,
  props<Error>(),
);

export const setSelectedDates = createAction(
  BikeActionTypes.SET_SELECTED_DATES,
  props<DatesRange>(),
);

export const setSelectedHours = createAction(
  BikeActionTypes.SET_SELECTED_HOURS,
  props<{ pickUpHour?: number | null; returnHour?: number | null }>(),
);

export const setAvailableVariations = createAction(
  BikeActionTypes.SET_AVAILABLE_VARIATIONS,
  props<{ rideIds: Array<number> }>(),
);

export const setBikeFromVariations = createAction(
  BikeActionTypes.SET_BIKE_FROM_VARIATIONS,
  props<{ prettySize: string }>(),
);

export const setPremiumInsuranceEnabled = createAction(
  BikeActionTypes.SET_IS_PREMIUM_INSURANCE_ENABLED,
  props<{ enabled: boolean }>(),
);
