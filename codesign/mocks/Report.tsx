import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

import {
  ReportLocationType,
  ReportType,
  Coordinates,
  ReportLocationDetails,
  IndoorDetails
} from '@/types/Report';
import { ReportFormDetails } from '@/types/Report';

/**
 * @returns random coordinates on Texas A&M University campus
 * @example [-96.35119602985726, 30.617351074711575]
 */
export const createRandomCoordinates = (): Coordinates => {
  const longitude = faker.number.float({
    min: -96.35119602985726,
    max: -96.33890180386302,
    fractionDigits: 15
  });
  const latitude = faker.number.float({
    min: 30.607255922217114,
    max: 30.617351074711575,
    fractionDigits: 15
  });
  return [longitude, latitude] as Coordinates;
};

export const createReportFormDetails = (
  overrideData: Partial<ReportFormDetails> = {}
): ReportFormDetails => {
  const reportLocation = faker.helpers.arrayElement(
    Object.values(ReportLocationType)
  );
  const reportLocationDetails: ReportLocationDetails =
    createReportLocationDetails(reportLocation);
  return {
    id: faker.number.int({ min: 10000, max: 1000000 }),
    createdAt: faker.date.recent(),
    reportType: faker.helpers.arrayElement(Object.values(ReportType)),
    reportLocation: reportLocation,
    reportLocationDetails: reportLocationDetails,
    coordinates: createRandomCoordinates(),
    images: [],
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    ...overrideData
  };
};

export const createReportLocationDetails = (
  reportLocation: ReportLocationType
) => {
  if (reportLocation === ReportLocationType.INDOOR) {
    const indoorDetails: IndoorDetails = {
      buildingName: faker.company.name(),
      floorNumber: faker.number.int({ min: 1, max: 10 })
    };
    return { indoorDetails };
  }
  return {};
};

export const reportFactory = Factory.extend({
  id() {
    return faker.number.int({ min: 10000, max: 1000000 });
  },
  createdAt() {
    return faker.date.recent();
  },
  reportType() {
    return faker.helpers.arrayElement(Object.values(ReportType));
  },
  reportLocation(i: number) {
    return i % 2 ? ReportLocationType.INDOOR : ReportLocationType.OUTDOOR;
  },
  reportLocationDetails(i: number) {
    return i % 2
      ? {
          buildingName: faker.company.name(),
          floorNumber: faker.number.int({ min: 1, max: 10 })
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
    return faker.lorem.sentence();
  },
  description() {
    return faker.lorem.paragraph();
  }
});
