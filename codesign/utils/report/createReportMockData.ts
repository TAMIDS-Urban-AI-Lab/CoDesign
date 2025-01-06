import { ReportLocationType, ReportType, Report } from '@/types/Report';
import { getRandomNumber } from '../Math';

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
  const geoCoordinates = [
    getRandomNumber(37.7749, 37.7751), // longitude
    getRandomNumber(-122.4194, -122.4196) // latitude
  ];
  const reportData = new Report({
    id: Math.floor(Math.random() * 1000),
    reportType: ReportType.MAINTENANCE,
    title: 'Crack in the pavement by the bus stop',
    description:
      'While I was walking to the bus top to take bus 47, I noticed that there is a crack in the pavement by the bus stop. It makes it pretty easy for people to trip over it and fall.',
    reportLocation,
    reportLocationDetails,
    geoCoordinates,
    createdAt: new Date(),
    ...report
  });
  return reportData;
}
