import * as moment from 'moment';
import range from 'lodash-es/range';
import difference from 'lodash-es/difference';
import {
  EngagedDays,
  EngagedHours,
  EngagedHoursByDay
} from '@api/api-rides/types';
import {ExpandedBikeData} from '@models/bike/bike.types';
import get from 'lodash-es/get';
import {TimeSlot, TimeSlots} from '@models/business/business';
import {HOURS_IN_DAY, MIN_OPENING_HOUR} from '@core/constants/time';
import {HourPickerOption} from '../types';
import {mergeWith} from 'lodash-es';

export type ColorsOption = Array<{
  d: any | number | string;
  background?: string;
  cssClass?: string;
}>;

export const getValidDates = (
  startDate: moment.Moment,
  unavailableToRange: Array<string>,
  availableToRange: Array<string>
): Array<Date> => {
  const lastAvailableDay = unavailableToRange
    .map(isoDate => moment(isoDate))
    .sort((a, b) => a.diff(b))
    .find(m => m.isSameOrAfter(startDate, 'day'))
    .subtract(1, 'day');
  const diffBetween = lastAvailableDay.diff(startDate, 'days');
  const current = moment(startDate);
  const result = [current.toDate()];

  for (let i = 1; i <= diffBetween; i++) {
    if (!availableToRange.includes(current.format('YYYY-MM-DD'))) {
      result.push(current.toDate());
    }
    current.add(1, 'days');
  }
  return result;
};

export const getAbsentNumbers = (a: number[]): number[] =>
  difference(range(HOURS_IN_DAY), a);

export const getColorsOption = (
  {unavailable, booked, partlyUnavailable}: EngagedDays,
  engagedHoursByDay: EngagedHoursByDay,
  isHalfDay: boolean,
  timeSlots: TimeSlots
) => {
  const fullyUnavailable = [...unavailable, ...booked].map(d => ({
    d,
    cssClass: 'fully-unavailable-day'
  }));
  const halfDayAvailable = (isHalfDay ? partlyUnavailable : []).map(d => {
    const [availableHalfDay] = getAvailableHalfDays(
      engagedHoursByDay[d],
      timeSlots
    );
    const prefix = availableHalfDay === 1 ? 'first' : 'second';

    return {
      d,
      cssClass:
        availableHalfDay === 1 || availableHalfDay === 2
          ? `${prefix}-half-available`
          : ''
    };
  });
  return [...fullyUnavailable, ...halfDayAvailable] as ColorsOption;
};

export const getIsHalfDay = (bikeData: ExpandedBikeData) =>
  !!get(bikeData, 'user.business.timeSlots');

export const getAvailableHalfDays = (
  {unavailable, closed}: EngagedHours,
  timeSlots: TimeSlots
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
  } else if (availableHalfDay === 2) {
    return 'second';
  } else {
    return '';
  }
};

export const customizer = (objValue: unknown, srcValue: unknown) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const getDayHalvesData = (
  timeSlots: TimeSlots,
  dayHalves: Array<1 | 2>
) =>
  timeSlots.map((slot, index) => {
    const {startTime, endTime} = slot;
    const start = String(startTime.hour).padStart(2, '0');
    const end = String(endTime.hour).padStart(2, '0');
    const hoursAvailable = `${start}:00 - ${end}:00`;
    const isAvailable = dayHalves.includes((index + 1) as 1 | 2);

    return {
      isAvailable,
      hoursAvailable,
      isChecked: false
    };
  });

export const getInitialHourPickerOptions = (): Array<HourPickerOption> =>
  range(MIN_OPENING_HOUR, HOURS_IN_DAY).map(item => ({
    value: item,
    label: `${String(item).padStart(2, '0')}:00`,
    isDisabled: false
  }));
