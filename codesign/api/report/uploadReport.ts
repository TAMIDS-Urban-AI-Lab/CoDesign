import axios from "axios";
import Constants from "expo-constants";
import { ReportFormDetails } from "@/types/Report";

/**
 * Upload report to the server
 * @param reports 
 */
export async function uploadReport(reportData: ReportFormDetails) {
  try {
    const response = await axios.post(Constants.expoConfig?.extra?.baseUrl ?? '', JSON.stringify(reportData), {
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log("Server-success: POST");
    return response.data;
  } catch (error) {
    throw new Error("Server-error: POST");
  }
};
