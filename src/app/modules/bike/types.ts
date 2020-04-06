import { BikeVariations, ExpandedBikeData } from '@models/bike/bike.types';
import { EngagedDays, EngagedHoursByDay } from '@api/api-rides/types';
import * as moment from 'moment';

export const BIKE_DATA = 'BIKE_DATA';
export const ENGAGED_TIME = 'ENGAGED_TIME';

export enum HourTypes {
  PickUp = 'pickup',
  Return = 'return',
}

export interface EngagedTime {
  engagedHoursByDay?: EngagedHoursByDay;
  engagedDays?: EngagedDays;
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
  engagedHoursByDay?: EngagedHoursByDay;
  engagedDays?: EngagedDays;
  loadingData: Array<string>;
}
