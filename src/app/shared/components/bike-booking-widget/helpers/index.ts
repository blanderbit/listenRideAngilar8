import range from 'lodash-es/range';
import { EngagedHours } from '@api/api-rides/types';
import { TimeSlots } from '@models/business/business';
import { HOURS_IN_DAY, MIN_OPENING_HOUR } from '@core/constants/time';
import { HalfDaysData, HourPickerOption } from '../types';
import { getAvailableHours } from './check-availabilities';

export {
  isDayCanBeEndDate,
  isDayFullyAvailable,
  isValidDate,
  getAvailableHours,
} from './check-availabilities';

export const getAvailableToReturnHours = (
  unavailableHours: Array<number>,
  closedHours: Array<number>,
  firstAvailableHour: number,
): Array<number> => {
  const unavailableOnly = unavailableHours.filter(
    h => !closedHours.includes(h),
  );
  const lastAvailableHour = Math.min(...unavailableOnly);

  return getAvailableHours(closedHours).filter(
    n => n < lastAvailableHour && n > firstAvailableHour,
  );
};

export const getAvailableHalfDays = (
  engagedHours: EngagedHours,
  timeSlots: TimeSlots,
): Array<1 | 2> => {
  const unAvailableHours = engagedHours
    ? [...engagedHours.unavailable, ...engagedHours.closed]
    : [];

  return timeSlots.reduce((result, current, index) => {
    const hoursRange = range(current.startTime.hour, current.endTime.hour + 1);

    if (!hoursRange.some(hour => unAvailableHours.includes(hour))) {
      result.push(index + 1);
    }
    return result;
  }, []);
};

export const getAvailableHalfDayPrefix = (availableHalfDay: number): string => {
  if (availableHalfDay === 1) {
    return 'first';
  }
  if (availableHalfDay === 2) {
    return 'second';
  }
  return '';
};

export const getDayHalvesData = (
  timeSlots: TimeSlots,
  dayHalves: Array<1 | 2> = [],
): HalfDaysData =>
  timeSlots.reduce((result, slot, index) => {
    const { startTime, endTime } = slot;
    const start = String(startTime.hour).padStart(2, '0');
    const end = String(endTime.hour).padStart(2, '0');
    const hoursAvailable = `${start}:00 - ${end}:00`;
    const isAvailable = dayHalves.includes((index + 1) as 1 | 2);

    return {
      ...result,
      [hoursAvailable]: {
        isAvailable,
        isChecked: false,
        startHour: startTime.hour,
        endHour: endTime.hour,
      },
    };
  }, {});

export const getInitialHourPickerOptions = (): Array<HourPickerOption> =>
  range(MIN_OPENING_HOUR, HOURS_IN_DAY).map(item => ({
    value: item,
    label: `${String(item).padStart(2, '0')}:00`,
    isDisabled: false,
  }));
