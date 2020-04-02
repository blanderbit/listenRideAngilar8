const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
export const MIN_OPENING_HOUR = 6;
export const HOURS_IN_DAY = 24;
export const DAY = HOURS_IN_DAY * HOUR;
export const DATE_FORMAT = 'YYYY-MM-DD';
export const URL_DATE_FORMAT = `${DATE_FORMAT}THH`;
export const YEAR_MONTH_FORMAT = 'YYYY-MM';

export const enum PeriodStartDate {
  HALF_DAY = 43200,
  ONE_DAY = 0,
  TWO_DAYS = 86400,
  TREE_DAYS = 172800,
  FOUR_DAYS = 259200,
  FIVE_DAYS = 345600,
  SIX_DAYS = 432000,
  SEVEN_DAYS = 518400,
  EIGHT_AND_MORE_DAYS = 604800,
  MONTH = 2419200,
}
