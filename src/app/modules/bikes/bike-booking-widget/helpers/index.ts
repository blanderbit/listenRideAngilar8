import * as moment from 'moment';
import range from 'lodash-es/range';
import difference from 'lodash-es/difference';
import { EngagedHours } from '@api/api-rides/types';
import { ExpandedBikeData } from '@models/bike/bike.types';
import get from 'lodash-es/get';
import { TimeSlots } from '@models/business/business';
import { HOURS_IN_DAY, MIN_OPENING_HOUR } from '@core/constants/time';
import { HourPickerOption } from '../types';

export const getAbsentNumbers = (a: number[]): number[] =>
  difference(range(HOURS_IN_DAY), a);

export const getIsHalfDay = (bikeData: ExpandedBikeData) =>
  !!get(bikeData, 'user.business.timeSlots');

export const getAvailableHalfDays = (
  { unavailable, closed }: EngagedHours,
  timeSlots: TimeSlots,
): Array<1 | 2> => {
  const unAvailableHours = [...unavailable, ...closed];

  return timeSlots.reduce((result, current, index) => {
    const hoursRange = range(current.startTime.hour, current.endTime.hour + 1);

    if (!hoursRange.some(hour => unAvailableHours.includes(hour))) {
      result.push(index + 1);
    }
    return result;
  }, []);
};

export const getAvailableHalfDayPrefix = (availableHalfDay: number) => {
  if (availableHalfDay === 1) {
    return 'first';
  }
  if (availableHalfDay === 2) {
    return 'second';
  }
  return '';
};

// eslint-disable-next-line consistent-return
export const customizer = (objValue: unknown, srcValue: unknown) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const getDayHalvesData = (
  timeSlots: TimeSlots,
  dayHalves: Array<1 | 2>,
) =>
  timeSlots.map((slot, index) => {
    const { startTime, endTime } = slot;
    const start = String(startTime.hour).padStart(2, '0');
    const end = String(endTime.hour).padStart(2, '0');
    const hoursAvailable = `${start}:00 - ${end}:00`;
    const isAvailable = dayHalves.includes((index + 1) as 1 | 2);

    return {
      isAvailable,
      hoursAvailable,
      isChecked: false,
    };
  });

export const getInitialHourPickerOptions = (): Array<HourPickerOption> =>
  range(MIN_OPENING_HOUR, HOURS_IN_DAY).map(item => ({
    value: item,
    label: `${String(item).padStart(2, '0')}:00`,
    isDisabled: false,
  }));
