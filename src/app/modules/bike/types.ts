import { ExpandedBikeData } from '@models/bike/bike.types';
import { EngagedDays, EngagedHoursByDay } from '@api/api-rides/types';

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
  startDay?: string;
  endDay?: string;
  pickUpHour?: number;
  returnHour?: number;
  isPremiumInsuranceEnabled?: boolean;
}

export interface BikeState {
  bikeData?: ExpandedBikeData;
  bookingData: BookingData;
  engagedHoursByDay?: EngagedHoursByDay;
  engagedDays?: EngagedDays;
  loadingData: Array<string>;
}
