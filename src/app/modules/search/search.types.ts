import {Bike} from '@models/bike/bike.types';

export interface SearchModel {
  bikes: Bike[];
  bikes_coordinates: any[];
  location: any;
  showFilter?: boolean;
  showSorting?: boolean;
  filterPayload?: SearchPayload;
}

export interface Location {
  lat: number;
  lng: number;
  type?: string;
  zoom?: number;
  city?: string;
}

export interface SearchPayload {
  location?: string;
  page?: number;
  limit?: number;
  category?: string;
  height?: number;
  brand?: string;
  sort_by?: string;
  sort_direction?: string;
  start_date?: Date;
  duration?: number;
}
