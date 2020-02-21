import {Bike} from '@models/bike/bike.types';

export interface MyBikesState {
  bikes: Bike[];
  selectedBikes: Bike[];
  loading: boolean;
  filterValue?: string;
}
