import {BikesCluster, ExpandedBikeData} from '@models/bike/bike.types';

export interface RideResponse {
  current: Omit<ExpandedBikeData, 'cluster' | 'category' | 'subcategory'> & {
    category: number;
  };
  cluster: BikesCluster;
}
