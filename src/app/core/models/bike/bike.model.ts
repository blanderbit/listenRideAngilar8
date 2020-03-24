/* eslint-disable */
import { AccessoriesInterface } from '../../../modules/list-my-bike/model/models';

export class BIKE {
  constructor(init?: Partial<BIKE>) {
    Object.assign(this, init);
  }

  new_images: Array<Images> = [];
  variations: Array<Variations> = [];
  details: string = '';
  frame_number: string = '';
  category: string | number;
  description: string = '';
  brand: string = '';
  name: string = '';
  bicycle_number: string = '';
  frame_size: string = '';
  coverage_total: number;
  custom_price: number;
  size: number;
  price: number; // ?
  user_id: number;
  discounts: Discounts = new Discounts();
  location: Location;
  prices: Array<number> = [];
  accessories: AccessoriesInterface = new AccessoriesInterface();
  available: boolean;
}

class Location {
  constructor(init?: Partial<Location>) {
    Object.assign(this, init);
  }

  street: string = '';
  zip: string = '';
  city: string = '';
  country: string = '';
}

class Discounts {
  constructor(init?: Partial<Discounts>) {
    Object.assign(this, init);
  }

  daily: number;
  weekly: number;
}

class Images {
  constructor(init?: Partial<Images>) {
    Object.assign(this, init);
  }
  file: File;
  is_primary: boolean;
  position: number;
}

export class Variations {
  constructor(init?: Partial<Variations>) {
    Object.assign(this, init);
  }

  size: number | string;
  frame_size: string = '';
  bicycle_number: string = '';
  frame_number: string = '';
  available: boolean = true;
}
