import axios from "axios";
import { Report } from "@/types/Report";

const BASE_URL  = "http://10.55.160.10:5000/locations";

// send user report to backend server
export async function sendReportToServer(reports: Report[] = []): Promise<void> 
{
  try {
    const response = await axios.post(BASE_URL, JSON.stringify(reports), {
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("Server-success: POST");
  } catch (error) {
    console.log("Server-Error:", error);
  }
};

// get user report from backend server
export async function getReportFromServer(
  west: number, 
  south: number, 
  east: number, 
  north: number
): Promise<Report[]>
{
  try {
    const query = `${BASE_URL}?west=${west}&south=${south}&east=${east}&north=${north}`;
    const response = await axios.get<Report[]>(query);
    console.log("Server-success: GET");
    return response.data;
  } catch (error) {
    console.log("Server-Error:", error);
    return [];
  }
};
