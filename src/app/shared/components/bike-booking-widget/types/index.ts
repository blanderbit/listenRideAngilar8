import * as moment from 'moment';
import { HourTypes } from '@modules/bike/types';

export interface DatesRange {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface StartDateChangedEvent {
  startDate: moment.Moment;
}

export interface HalfDay {
  isAvailable: boolean;
  isChecked: boolean;
  startHour: number;
  endHour: number;
}

export interface HalfDaysData {
  [hoursAvailable: string]: HalfDay;
}

export interface CalendarValues {
  month: number;
  year: number;
}

export interface HourPickerOption {
  value: number;
  label: string;
  isDisabled: boolean;
}

export interface BookingOverview {
  daysAmount: number;
  periodLabel: string;
  price: number;
  subtotal: number;
  discount?: number;
  averageDiscount?: number;
  insurancePrice?: number;
  serviceFee?: number;
  discountedSubtotal?: number;
  premiumInsurancePrice?: number;
  premiumInsuranceTotal?: number;
  total?: number;
}

export interface BookingSubmit {
  startDate: Date;
  endDate: Date;
}

export interface HourPickerEventParams {
  isOpen: boolean;
  hourType: HourTypes;
}
