export interface SearchModel {
  bikes: any[];
  displayBikes: any[];
  location: any;
  offset?: number;
  limit?: number;
}

export interface Location {
  lat: number;
  lng: number;
  type?: string;
  zoom?: number;
}
