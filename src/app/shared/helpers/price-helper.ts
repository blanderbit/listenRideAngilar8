// TODO Fix all the esLint errors
/* eslint-disable */
import { BikePrice } from '@models/bike/bike.types';
import { PeriodStartDate } from '@core/constants/time';

export const priceCount = [
  { count: 1, start_at: 86400 },
  { count: 2, start_at: 172800 },
  { count: 3, start_at: 259200 },
  { count: 4, start_at: 345600 },
  { count: 5, start_at: 432000 },
  { count: 6, start_at: 518400 },
  { count: 7, start_at: 604800 },
  { count: 8, start_at: 2419200 },
];

export interface PricesByDay {
  '1/2'?: number;
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '28': number;
}

const PRICES_BY_DAYS = new Map<PeriodStartDate, string>([
  [PeriodStartDate.HALF_DAY, '1/2'],
  [PeriodStartDate.ONE_DAY, '1'],
  [PeriodStartDate.TWO_DAYS, '2'],
  [PeriodStartDate.TREE_DAYS, '3'],
  [PeriodStartDate.FOUR_DAYS, '4'],
  [PeriodStartDate.FIVE_DAYS, '5'],
  [PeriodStartDate.SIX_DAYS, '6'],
  [PeriodStartDate.SEVEN_DAYS, '7'],
  [PeriodStartDate.EIGHT_DAYS, '8'],
  [PeriodStartDate.MONTH, '28'],
]);

export const getPricesByDay = (originalPrices: BikePrice[]): PricesByDay =>
  originalPrices.reduce(
    (acc, curr) => ({
      ...acc,
      [PRICES_BY_DAYS.get(curr.startAt)]: curr.price,
    }),
    {},
  ) as PricesByDay;
