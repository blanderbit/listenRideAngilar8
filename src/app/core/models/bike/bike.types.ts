export interface Bike {
  id: string;
  brand: string;
  name: string;
  image_file: string;
  category: string;
  size: number;
  // TODO: add type
  pretty_size: any;
  daily_price: number;
  weekly_price: number;
  rating_average: number;
  ratings_total: number;
  distance: number;
  // TODO: add type
  cluster: any;
}
