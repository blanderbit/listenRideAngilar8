import {Bike} from '@models/bike/bike.types';

export interface Brand {
  id: number;
  name?: string;
  logo?: string;
  categories?: Array<number>;
  pins?: Array<any>;
  thumb_image?: string;
}

export interface BrandInfo {
  id: number;
  title: string;
  texts: {
    columns: any;
    faq: Array<string>,
    meta_data: {
      title: string;
      desc: string;
    };
    main: {
      title: string;
      desc: string;
    };
    info: {
      title: string;
      desc: string;
      fineprint: string;
    };
  };
  hero_images: Array<string>;
  logo?: string;
  bikes: Bike[];
  technical_specs_image?: string;
}
