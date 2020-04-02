import { RideResponse } from '@api/api-rides/types';
import {
  BikesCluster,
  BikeVariations,
  ExpandedBikeData,
} from '@models/bike/bike.types';
import { getCategoryData } from '@shared/helpers';
import * as camelcaseKeys from 'camelcase-keys';
import { getPricesByDay } from '@shared/helpers/price-helper';
import get from 'lodash-es/get';

const getBikeVariations = (bikesCluster: BikesCluster): BikeVariations => {
  const { variations } = bikesCluster;
  const idsBySize = variations.reduce((result, { prettySize, id }) => {
    if (result[prettySize]) {
      result[prettySize].push(id);
      return result;
    }
    return { ...result, [prettySize]: [id] };
  }, {});

  return Object.keys(idsBySize)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .reduce((result, size) => {
      return {
        ...result,
        [size]: {
          bikeIds: idsBySize[size],
          amount: idsBySize[size].length,
        },
      };
    }, {});
};

export const processRideResponse = (
  response: RideResponse,
): ExpandedBikeData => {
  // TODO Remove 'uppercasing' after interceptor addition
  const upperCasedResponse = (camelcaseKeys(
    (response as unknown) as {
      [key: string]: unknown;
    },
    { deep: true },
  ) as unknown) as RideResponse;
  const { current: bikeData, cluster } = upperCasedResponse;
  const { countryCode, prices, user } = bikeData;
  const { category, subcategory } = getCategoryData(bikeData.category);
  const isInsuranceEnabled =
    (user.business ? user.business.insuranceEnabled : true) &&
    (countryCode === 'DE' || countryCode === 'AT');
  const variations = cluster ? getBikeVariations(cluster) : undefined;
  const clusterId = cluster ? cluster.id : undefined;
  const pricesByDay = getPricesByDay(prices);
  const timeSlots = get(bikeData, 'user.business.timeSlots');
  const isHalfDay = !!timeSlots;

  return {
    ...bikeData,
    pricesByDay,
    category,
    subcategory,
    variations,
    clusterId,
    isInsuranceEnabled,
    timeSlots,
    isHalfDay,
  };
};
