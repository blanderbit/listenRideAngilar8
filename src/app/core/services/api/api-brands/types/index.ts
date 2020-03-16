export interface Brand {
  id: number;
  name?: string;
  logo?: string;
  categories?: Array<number>;
  pins?: Array<any>;
  thumb_image?: string;
}
