import { Factory } from 'miragejs';

import { ReportLocationType, ReportType, Coordinates } from '@/types/Report';
import { getRandomFloat } from '@/utils/Math';

export const createRandomCoordinates = (): Coordinates => {
  return [
    getRandomFloat(-96.35119602985726, -96.33890180386302),
    getRandomFloat(30.607255922217114, 30.617351074711575)
  ] as Coordinates;
};

export const reportFactory = Factory.extend({
  id() {
    return Math.floor(Math.random() * 1000);
  },
  createdAt() {
    return new Date();
  },
  reportType() {
    return ReportType.MAINTENANCE;
  },
  reportLocation(i: number) {
    return i % 2 ? ReportLocationType.INDOOR : ReportLocationType.OUTDOOR;
  },
  reportLocationDetails(i: number) {
    return i % 2
      ? {
          buildingName: 'Test Building',
          floorNumber: 2
        }
      : {};
  },
  coordinates() {
    return createRandomCoordinates();
  },
  images() {
    return [];
  },
  title() {
    return 'Crack in the pavement by the bus stop';
  },
  description() {
    return 'While I was walking to the bus top to take bus 47, I noticed that there is a crack in the pavement by the bus stop. It makes it pretty easy for people to trip over it and fall.';
  }
});
