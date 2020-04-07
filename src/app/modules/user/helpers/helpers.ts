import { User } from '@models/user/user';

export const ratingArray = (user: User): Array<number> => {
  let total: number = user.ratingLister + user.ratingRider;
  let avg: number =
    user.ratingLister === 0 || user.ratingRider === 0 ? total : total / 2;
  return Array(avg);
};

export const hoursRange = (startHour: string, endHour: string): string => {
  return `${startHour}:00 - ${endHour}:00`;
};
