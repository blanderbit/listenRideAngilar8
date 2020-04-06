import { BikePrice } from '@models/bike/bike.types';
import {
  DAYS_IN_MONTH,
  DAYS_IN_WEEK,
  PeriodStartDate,
} from '@core/constants/time';

export const FEE_COEFFICIENT = 0.125;
export const TAX_COEFFICIENT = 0.19;
export const PREMIUM_INSURANCE_PRICE = 3;

// TODO Please, do not use this and fix the place where it is used to avoid snake_case
/* eslint-disable @typescript-eslint/camelcase */
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

export const PRICES_BY_DAYS = new Map<PeriodStartDate, string>([
  [PeriodStartDate.HALF_DAY, '1/2'],
  [PeriodStartDate.ONE_DAY, '1'],
  [PeriodStartDate.TWO_DAYS, '2'],
  [PeriodStartDate.TREE_DAYS, '3'],
  [PeriodStartDate.FOUR_DAYS, '4'],
  [PeriodStartDate.FIVE_DAYS, '5'],
  [PeriodStartDate.SIX_DAYS, '6'],
  [PeriodStartDate.SEVEN_DAYS, '7'],
  [PeriodStartDate.EIGHT_AND_MORE_DAYS, '8'],
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

export const getDiscountedSubtotal = (
  daysAmount: number,
  pricesByDay: PricesByDay,
): number => {
  if (daysAmount >= 1 && daysAmount <= DAYS_IN_WEEK) {
    return pricesByDay[daysAmount] * daysAmount;
  }
  if (daysAmount > DAYS_IN_WEEK && daysAmount < DAYS_IN_MONTH) {
    const key = PRICES_BY_DAYS.get(PeriodStartDate.EIGHT_AND_MORE_DAYS);
    const subtotalForFirstWeek = pricesByDay[DAYS_IN_WEEK] * DAYS_IN_WEEK;
    const subtotalForRest = pricesByDay[key] * (daysAmount - DAYS_IN_WEEK);
    return subtotalForFirstWeek + subtotalForRest;
  }
  return pricesByDay[DAYS_IN_MONTH] * daysAmount;
};

export const getServiceFee = (subtotal: number): number => {
  const priceWithFee = subtotal * FEE_COEFFICIENT;

  return priceWithFee * TAX_COEFFICIENT + priceWithFee;
};

export const getInsurancePrice = (
  isPremiumInsuranceEnabled: boolean,
): number => {
  return 0;
};
/**
 fee_rider = subtotal * 0.125
 tax_rider = fee_rider * 0.19
 insurance_price = basic_insurance_price + premium_insurance_extra_price
 basic_insurance_price = Insurance::PRICES[@ride.coverage_total] * @price_calculation_strategy.total_calendar_days
 premium_insurance_extra_price = Insurance::PREMIUM_EXTRA_PRICE * @price_calculation_strategy.total_calendar_days
 Insurance::VALID_COUNTRIES = %w[AT DE]
 Insurance::PRICES = {
    0 => 0,
    1000 => 1,
    2000 => 2,
    3000 => 3,
    4000 => 4,
    5000 => 5
  }
 Insurance::PREMIUM_EXTRA_PRICE = 3
 */
