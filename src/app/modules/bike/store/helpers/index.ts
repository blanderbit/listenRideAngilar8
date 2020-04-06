import { ExpandedBikeData } from '@models/bike/bike.types';

export const checkIsBikeLoaded = (
  bikeId: number,
  bikeData?: ExpandedBikeData,
): boolean =>
  bikeData &&
  (bikeId === bikeData.id ||
    Object.values(bikeData.variations || {}).some(value =>
      value.bikeIds.includes(bikeId),
    ));
