import { typeList } from '@core/constants/filters.const';
import { DEFAULT_MAP_OPTIONS } from '@core/constants/map-options';
import { environment } from '@environment/environment';
import { Accessories } from '@models/bike/bike.types';
import {
  CategoryInterface,
  SubCategoryInterface,
} from '@modules/list-my-bike/model/models';

export { mergeObjects } from './merge-objects';

const ACCESSORIES_IMG_PATH = 'assets/images/icons/accessories/';

interface CategoryData {
  category: CategoryInterface;
  subcategory: SubCategoryInterface;
}

export interface AccessoryImage {
  name: keyof Accessories;
  title: string;
  src: string;
}

export const getCategoryData = (
  subcategoryId: number,
): CategoryData | undefined =>
  typeList.reduce((accumulator: CategoryData | undefined, category) => {
    const subcategory = category.categories.find(
      ({ value }) => Number(value) === subcategoryId,
    );

    if (subcategory !== undefined) {
      return {
        category,
        subcategory,
      };
    }
    return accumulator;
  }, undefined);

export const getStaticMapSrc = (latitude: number, longitude: number) => {
  const { zoom, icon } = DEFAULT_MAP_OPTIONS;

  return (
    'https://maps.googleapis.com/maps/api/staticmap?' +
    `center=${latitude},${longitude}&zoom=${zoom}` +
    `&size=1280x400&scale=2&markers=icon:${icon}|` +
    `${latitude},${longitude}&key=${environment.LNR_API_KEY_GOOGLE_MAPS}`
  );
};

export const getAccessoryImage = (name: keyof Accessories): AccessoryImage => ({
  name,
  title: `list.accessories.${name}`,
  src: `${ACCESSORIES_IMG_PATH}${name}.svg`,
});
