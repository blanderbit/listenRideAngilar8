import { ExpandedBikeData } from '@models/bike/bike.types';

export const checkIsBikeLoaded = (
  bikeData: ExpandedBikeData,
  prevBikeData?: ExpandedBikeData,
): boolean =>
  bikeData &&
  prevBikeData &&
  (bikeData.id === prevBikeData.id ||
    Object.values(bikeData.variations || {}).some(value =>
      value.bikeIds.includes(bikeData.id),
    ));
