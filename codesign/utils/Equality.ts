import { Coordinates } from '@/types/Report';

export const areCoordinatesEqual = (
  a: Coordinates,
  b: Coordinates
): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};
