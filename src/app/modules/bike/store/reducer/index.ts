import { Action, createReducer, on } from '@ngrx/store';
import intersection from 'lodash-es/intersection';
import { BikeState } from '../../types';
import * as BikeActions from '../actions';

export const initialState: BikeState = {
  bookingData: {},
};

const reducer = createReducer(
  initialState,
  on(BikeActions.setBike, (state, { bikeData }) => {
    return { ...state, bikeData };
  }),
  on(BikeActions.setSelectedDates, (state, { startDate, endDate }) => ({
    ...state,
    bookingData: {
      ...state.bookingData,
      startDay: startDate,
      endDay: endDate,
      pickUpHour: undefined,
      returnHour: undefined,
    },
  })),
  on(BikeActions.setSelectedHours, (state, { pickUpHour, returnHour }) => ({
    ...state,
    bookingData: {
      ...state.bookingData,
      pickUpHour:
        pickUpHour ||
        (pickUpHour === null ? undefined : state.bookingData.pickUpHour),
      returnHour:
        returnHour ||
        (returnHour === null ? undefined : state.bookingData.returnHour),
    },
  })),
  on(BikeActions.setAvailableVariations, (state, { rideIds }) => {
    return {
      ...state,
      bikeData: {
        ...state.bikeData,
        variations: Object.entries(state.bikeData.variations).reduce(
          (result, [variationKey, variation]) => {
            const amountAvailable = intersection(variation.bikeIds, rideIds);

            return {
              ...result,
              [variationKey]: {
                ...variation,
                isAvailable: !!amountAvailable.length,
                amount: amountAvailable.length,
              },
            };
          },
          {},
        ),
      },
    };
  }),
  on(BikeActions.setBikeFromVariations, (state, { prettySize }) => {
    const { bikeData } = state;
    if (!prettySize || prettySize === bikeData.prettySize) {
      return state;
    }
    const [bikeId] = bikeData.variations[prettySize].bikeIds;

    return {
      ...state,
      bikeData: {
        ...bikeData,
        id: bikeId,
        prettySize,
      },
    };
  }),
  on(BikeActions.setPremiumInsuranceEnabled, (state, { enabled }) => ({
    ...state,
    bookingData: {
      ...state.bookingData,
      isPremiumInsuranceEnabled: enabled,
    },
  })),
);

export function BikeReducer(
  state: BikeState = initialState,
  action: Action,
): BikeState {
  return reducer(state, action);
}
