import {
  ReportLocationType,
  ReportType,
  Report,
  Coordinates
} from '@/types/Report';
import { getRandomNumber } from '../Math';

export const createRandomCoordinates = (): Coordinates => {
  return [
    getRandomNumber(-96.35119602985726, -96.33890180386302),
    getRandomNumber(30.607255922217114, 30.617351074711575)
  ] as Coordinates;
};

export function createReportMockData(report = {}): Report {
  // Randomly select a location
  const reportLocation =
    Math.random() < 0.5
      ? ReportLocationType.INDOOR
      : ReportLocationType.OUTDOOR;
  const reportLocationDetails =
    reportLocation === ReportLocationType.INDOOR
      ? {
          indoorDetails: {
            buildingName: 'Building ABC',
            floorNumber: 1
          }
        }
      : {};
  const coordinates = createRandomCoordinates();
  const reportData = new Report({
    id: Math.floor(Math.random() * 1000),
    reportType: ReportType.MAINTENANCE,
    title: 'Crack in the pavement by the bus stop',
    description:
      'While I was walking to the bus top to take bus 47, I noticed that there is a crack in the pavement by the bus stop. It makes it pretty easy for people to trip over it and fall.',
    reportLocation,
    reportLocationDetails,
    coordinates,
    createdAt: new Date(),
    ...report
  });
  return reportData;
}
