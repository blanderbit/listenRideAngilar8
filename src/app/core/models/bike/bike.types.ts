import { User } from '@models/user/user';
import { PeriodStartDate } from '@core/constants/time';
import { PricesByDay } from '@shared/helpers/price-helper';
import { TimeSlots } from '@models/business/business';
import {
  CategoryInterface,
  SubCategoryInterface,
} from '../../../modules/list-my-bike/model/models';

export interface ExpandedBikeData {
  id: number;
  brand: string;
  name: string;
  category: CategoryInterface;
  subcategory: SubCategoryInterface;
  description: string;
  size: number;
  isEquipment: boolean;
  available: boolean;
  ratingAverage: number;
  ratingsTotal: number;
  family: number;
  tz: string;
  discounts: { daily: number; weekly: number };
  customPrice: boolean;
  frameSize: string;
  accessories: Accessories;
  coverageTotal: number;
  isInsuranceEnabled: boolean;
  // Formatted bike size. Frame size if present or formatted rider height
  prettySize: string;
  dailyPrice: number;
  weeklyPrice: number;
  imageFile: string;
  images: Array<BikeImage>;
  // Approximate bike latitude
  latRnd: number;
  // Approximate bike longitude
  lngRnd: number;
  country: string;
  city: string;
  countryCode: string;
  street: string;
  zip: string;
  distance: number;
  ridesCount: number;
  isCluster: boolean;
  user: User;
  variations?: BikeVariations;
  clusterId?: number;
  pricesByDay: PricesByDay;
  timeSlots?: TimeSlots;
  isHalfDay: boolean;
}

export interface BikePrice {
  startAt: PeriodStartDate;
  price: string;
}

export interface BikeImage {
  id: number;
  isPrimary: boolean;
  position: number;
  original: string;
  medium: string;
}

export interface Accessories {
  lock?: boolean;
  helmet?: boolean;
  lights?: boolean;
  basket?: boolean;
  trailer?: boolean;
  childseat?: boolean;
  gps?: boolean;
}

export interface BikesCluster {
  id: number;
  sizes: Array<ClusterBikeSize>;
  variations: Array<{ id: number; size: number; prettySize: string }>;
}

export interface ClusterBikeSize {
  size: number;
  amount: number;
}

export interface Bike {
  id: string;
  brand: string;
  name: string;
  image_file: string;
  category: string;
  size: number;
  pretty_size: string;
  daily_price: number;
  weekly_price: number;
  rating_average: number;
  ratings_total: number;
  distance: number;
  rides_count: number;
  is_cluster: boolean;
}

export interface BikeVariation {
  isAvailable: boolean;
  bikeIds: Array<number>;
  size: number;
  amount: number;
}

export interface BikeVariations {
  [key: string]: BikeVariation;
}
