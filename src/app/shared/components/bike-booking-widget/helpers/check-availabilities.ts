import {
  EngagedDays,
  EngagedHours,
  EngagedHoursByDay,
} from '@api/api-rides/types';
import range from 'lodash-es/range';
import * as moment from 'moment';
import { DATE_FORMAT, HOURS_IN_DAY } from '@core/constants/time';
import difference from 'lodash-es/difference';
import { BookingData, EngagedTime } from '@modules/bike/types';

export const getAvailableHours = (unavailableHours: number[]): number[] =>
  difference(range(HOURS_IN_DAY), unavailableHours);

export const isValidDate = (
  bookingData: BookingData,
  engagedTime: EngagedTime,
): boolean => {
  const { pickUpHour, returnHour, startDay, endDay } = bookingData;
  const start = moment(startDay).hour(pickUpHour);
  const end = moment(endDay).hour(returnHour);
  const { engagedDays, engagedHoursByDay } = engagedTime;

  if (start.isBefore(moment(), 'd') || end.isSameOrBefore(start)) {
    return false;
  }
  const { closed, booked, unavailable } = engagedDays || ({} as EngagedDays);
  const invalidDays = engagedDays ? [...closed, ...booked, ...unavailable] : [];

  return ![start, end].some(date => {
    const dateString = date.format(DATE_FORMAT);
    return (
      invalidDays.some(d => d === dateString) ||
      Object.values(engagedHoursByDay[dateString] || {}).some(d =>
        d.includes(date.hour()),
      )
    );
  });
};

export const isDayFullyAvailable = (
  dateString: string,
  engagedHours: EngagedHours,
): boolean => {
  const { unavailable: unavailableHours, closed: closedHours } = engagedHours;
  const closingHour = closedHours
    .slice()
    .sort((a, b) => b - a)
    .reduce((res, curr) => {
      return res - curr === 1 ? curr : res;
    });
  const lastUnavailableHour = Math.max(...unavailableHours);

  return !!range(lastUnavailableHour + 1, closingHour).length;
};

export const isDayCanBeEndDate = (
  dateString: string,
  partlyUnavailableDays: Array<string>,
  engagedHoursByDay: EngagedHoursByDay,
): boolean => {
  if (partlyUnavailableDays.includes(dateString)) {
    const { unavailable, closed } = engagedHoursByDay[dateString];
    const firstUnavailableToRange = Math.min(...unavailable);
    const availableHours = getAvailableHours(closed).filter(
      n => n < firstUnavailableToRange,
    );

    if (availableHours.length) {
      return true;
    }
  }
  return false;
};
