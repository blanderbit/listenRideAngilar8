import * as moment from 'moment';

export interface DayChangeEvent {
  date: Date;
  marked?: any;
  active?: 'start' | 'end';
  target: HTMLElement;
}

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
  hoursAvailable: string;
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
