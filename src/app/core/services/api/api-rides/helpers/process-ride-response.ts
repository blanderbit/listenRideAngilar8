import {RideResponse} from '@api/api-rides/types';
import {ExpandedBikeData} from '@models/bike/bike.types';
import {getCategoryDataBySubcategoryId} from '@shared/helpers';

export const processRideResponse = ({
  current,
  cluster
}: RideResponse): ExpandedBikeData => {
  const {category, subcategory} = getCategoryDataBySubcategoryId(
    current.category
  );

  return {...current, category, subcategory, cluster};
};
