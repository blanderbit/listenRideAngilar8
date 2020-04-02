import { BikeVariations, ExpandedBikeData } from '@models/bike/bike.types';
import * as moment from 'moment';

export enum HourTypes {
  PickUp = 'pickup',
  Return = 'return',
}

export interface BookingData {
  startDay?: moment.Moment;
  endDay?: moment.Moment;
  pickUpHour?: number;
  returnHour?: number;
  isPremiumInsuranceEnabled?: boolean;
  bikeVariations?: BikeVariations;
}

export interface BikeState {
  bikeData?: ExpandedBikeData;
  bookingData: BookingData;
}
