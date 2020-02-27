export interface SubCategoryInterface {
  text: string;
  value: string | number;
}

export interface CategoryInterface {
  type: string;
  src: string;
  categories: Array<SubCategoryInterface>;
}

export class AccessoriesInterface {
  lock = false;
  helmet = false;
  lights = false;
  basket = false;
  trailer = false;
  childseat = false;
  gps = false;
}

export class AccessoriesImageInterface {
  gps = 'lnr-gps';
  lock = 'lnr-lock';
  basket = 'lnr-basket';
  helmet = 'lnr-helmet';
  lights = 'lnr-light';
  trailer = 'lnr-trailer';
  childseat = 'lnr-child-seat';
}

export class LoadedImageInterface {
  file: any;
  url: string | any;
  isMain: boolean;
  id?: number;
}

export class SizeListInterface {
  text: string;
  value: number;
}
