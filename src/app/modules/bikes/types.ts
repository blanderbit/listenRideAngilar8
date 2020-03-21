import { ExpandedBikeData } from '@models/bike/bike.types';
import { PricesByDay } from '@shared/helpers/price-helper';

export interface BikesState {
  currentBike: {
    bikeData: ExpandedBikeData;
    prices: PricesByDay;
    unavailableDays: any;
  };
}
