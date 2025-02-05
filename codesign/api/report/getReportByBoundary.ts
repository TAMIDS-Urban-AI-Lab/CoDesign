import axios from "axios";
import Constants from "expo-constants";
import { 
  Report, 
  ReportType, 
  ReportLocationType, 
  Coordinates, 
  ReportFormDetails 
} from "@/types/Report";

/**
 * Convert json response to Report type
 * @param data 
 * @returns 
 */
const convertToReportArray = (data: any[]): Report[] => {
  return data.map((item) => {
    const reportData: ReportFormDetails = {
      id: item.id,
      createdAt: new Date(item.createAt),
      reportType: ReportType[item.reportType as keyof typeof ReportType],
      reportLocation: ReportLocationType[item.reportLocation as keyof typeof ReportLocationType],
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
  try {
    const query = `${Constants.expoConfig?.extra?.baseUrl ?? ''}/locations?west=${west}&south=${south}&east=${east}&north=${north}`;
    const response = await axios.get<Report[]>(query);
    console.log("Server-success: GET");
    const reports = convertToReportArray(response.data);
    return reports;
  } catch (error) {
    console.log("Server-error:", error);
    return [];
  }
};
