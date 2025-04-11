import {
  Report,
  ReportType,
  ReportLocationType,
  Coordinates,
  ReportFormDetails
} from '@/types/Report';
import { ROUTES, constructQueryString } from '@/constants/api/routes';

/**
 * Convert json response to Report type
 * @param data
 * @returns
 */
const convertToReportArray = (data: ReportFormDetails[]): Report[] => {
  return data.map((item) => {
    const reportData: ReportFormDetails = {
      id: item.id,
      createdAt: new Date(item.createdAt),
      reportType: ReportType[item.reportType as keyof typeof ReportType],
      reportLocation:
        ReportLocationType[
          item.reportLocation as keyof typeof ReportLocationType
        ],
      reportLocationDetails: item.reportLocationDetails || {},
      coordinates: item.coordinates as Coordinates,
      images: item.images || [],
      title: item.title,
      description: item.description
    };

    return new Report(reportData);
  });
};

/**
 * Get uploaded reports within boundary
 * @param west
 * @param south
 * @param east
 * @param north
 * @returns
 */
export async function getReportByBoundary(
  west: number,
  south: number,
  east: number,
  north: number
): Promise<Report[]> {
  const query = constructQueryString(ROUTES.REPORT_LOCATION, {
    west,
    south,
    east,
    north
  });

  return fetch(query)
    .then((res) => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    })
    .then((res) => {
      const reports = convertToReportArray(res.data);
      return reports;
    })
    .catch(() => {
      throw new Error(`An error occurred while fetching reports.`);
    });
}
