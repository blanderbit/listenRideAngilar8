import { BikesCluster, ExpandedBikeData } from '@models/bike/bike.types';

export interface RideResponse {
  current: Omit<ExpandedBikeData, 'cluster' | 'category' | 'subcategory'> & {
    category: number;
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
