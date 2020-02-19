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
  lock: boolean = false;
  helmet: boolean = false;
  lights: boolean = false;
  basket: boolean = false;
  trailer: boolean = false;
  childseat: boolean = false;
  gps: boolean = false;
}

export class AccessoriesImageInterface {
  gps: string = 'lnr-gps';
  lock: string = 'lnr-lock';
  basket: string = 'lnr-basket';
  helmet: string = 'lnr-helmet';
  lights: string = 'lnr-light';
  trailer: string = 'lnr-trailer';
  childseat: string = 'lnr-child-seat';
}

export class LoadedImageInterface {
  file: any;
  url: string | any;
  isMain: boolean;
  id?
}

export class SizeListInterface {
  text: string;
  value: number;
}
