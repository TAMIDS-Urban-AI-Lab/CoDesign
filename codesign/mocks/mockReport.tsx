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
import { TAMU_CAMPUS_BOUNDS } from '@/constants/map/Coordinates';

export const createMockedReportFormDetails = (
  overrideData: Partial<ReportFormDetails> = {}
): ReportFormDetails => {
  const id = faker.number.int({ min: 10000, max: 1000000 });
  const reportLocation = faker.helpers.arrayElement(
    Object.values(ReportLocationType)
  );
  const reportLocationDetails: ReportLocationDetails =
    createMockedReportLocationDetails(reportLocation);
  return {
    id: id,
    createdAt: faker.date.recent(),
    reportType: faker.helpers.arrayElement(Object.values(ReportType)),
    reportLocation: reportLocation,
    reportLocationDetails: reportLocationDetails,
    coordinates: createMockedCoordinates(),
    images: [],
    title: createMockedReportTitle(id),
    description: createMockedReportDescription(id),
    ...overrideData
  };
};

export const createMockedReportLocationDetails = (
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

/**
 * @returns random coordinates on Texas A&M University campus
 * @example [-96.35119602985726, 30.617351074711575]
 */
export const createMockedCoordinates = (): Coordinates => {
  const longitude = faker.number.float({
    min: TAMU_CAMPUS_BOUNDS.MIN_LONGITUDE,
    max: TAMU_CAMPUS_BOUNDS.MAX_LONGITUDE,
    fractionDigits: 15
  });
  const latitude = faker.number.float({
    min: TAMU_CAMPUS_BOUNDS.MIN_LATITUDE,
    max: TAMU_CAMPUS_BOUNDS.MAX_LATITUDE,
    fractionDigits: 15
  });
  return [longitude, latitude] as Coordinates;
};

function createMockedReportTitle(i?: number) {
  const mockData: string[] = [
    'Pipe is leaking by sidewalk',
    'Broken street light near bus stop',
    'Check for broken window on 2nd floor'
  ];
  return i
    ? mockData[i % mockData.length]
    : faker.helpers.arrayElement(mockData);
}

function createMockedReportDescription(i?: number) {
  const mockData: string[] = [
    'I was walking to the library and noticed a pipe leaking water. The water was pooling on the sidewalk, making it slippery and dangerous for pedestrians.',
    'While waiting for the bus, I noticed that the street light near the bus stop was broken. It was dark and made it difficult to see.',
    'There is a broken window on the 2nd floor of the building. It looks like it has been broken for a while and needs to be fixed.'
  ];
  return i
    ? mockData[i % mockData.length]
    : faker.helpers.arrayElement(mockData);
}

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
    return createMockedCoordinates();
  },
  images() {
    return [];
  },
  title(i: number) {
    return createMockedReportTitle(i);
  },
  description(i: number) {
    return createMockedReportDescription(i);
  }
});
