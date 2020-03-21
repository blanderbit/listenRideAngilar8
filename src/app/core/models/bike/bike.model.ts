// TODO Fix to avoid eslint-ignore (see below in file)

import { AccessoriesInterface } from '../../../modules/list-my-bike/model/models';

export class BIKE {
  constructor(init?: Partial<BIKE>) {
    Object.assign(this, init);
  }

  new_images: Array<Images> = [];

  variations: Array<Variations> = [];

  // is_equipment: boolean = false;
  details = '';

  frame_number = '';

  category: string | number;

  description = '';

  brand = '';

  name = '';

  bicycle_number = '';

  frame_size = '';

  coverage_total: number;

  custom_price: number;

  size: number;

  price: number; // ?

  user_id: number;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

  street = '';

  zip = '';

  city = '';

  country = '';
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

  frame_size = '';

  bicycle_number = '';

  frame_number = '';

  available = true;
}
