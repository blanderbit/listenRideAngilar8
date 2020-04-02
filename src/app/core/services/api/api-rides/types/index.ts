import {
  BikePrice,
  BikesCluster,
  ExpandedBikeData,
} from '@models/bike/bike.types';

export interface RideResponse {
  current: Omit<
    ExpandedBikeData,
    'variations' & 'category' & 'subcategory' & 'clusterId' & 'pricesByDay'
  > & {
    category: number;
    prices: Array<BikePrice>;
  };
  cluster: BikesCluster;
}

export interface EngagedHours {
  unavailable: Array<number>;
  closed: Array<number>;
}

export interface EngagedHoursByDay {
  [day: string]: EngagedHours;
}

export interface EngagedDays {
  unavailable: Array<string>;
  booked: Array<string>;
  partlyUnavailable: Array<string>;
  closed: Array<string>;
  [index: string]: Array<string>;
}

export interface EngagedTimeResponse {
  days: EngagedDays;
  hours: EngagedHoursByDay;
}

export interface ClusterBikeSizeData {
  size: number;
  amount: number;
}

export interface ClusterResponse {
  sizes: Array<ClusterBikeSizeData>;
  rideIds: Array<number>;
}
