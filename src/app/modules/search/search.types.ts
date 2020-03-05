import {Bike} from '@models/bike/bike.types';

export interface SearchModel {
  bikes: Bike[];
  bikes_coordinates: any[];
  location: any;
  loading: boolean;
  showFilter?: boolean;
  showSorting?: boolean;
  filterPayload?: SearchPayload;
  metaData?: SearchMetaData;
}

export interface Location {
  lat: number;
  lng: number;
  type?: string;
  zoom?: number;
  city?: string;
}

export interface SearchPayload {
  category?: string;
  height?: number;
  brand?: string;
  sort_by?: string;
  sort_direction?: string;
  start_date?: Date | string;
  duration?: number;
}

export interface SearchMetaData {
  location?: string;
  page?: number;
  limit?: number;
}

export type SearchQueryParams = SearchPayload & SearchMetaData;
