import axios from 'axios';
import Constants from 'expo-constants';

import { ReportFormDetails, Report } from '@/types/Report';
import {
  getReportsLocal,
  setReportsLocal
} from '@/utils/report/saveReportLocal';

/**
 * Upload report to the server
 * @param reports
 */
export async function uploadReport(reportData: ReportFormDetails) {
  try {
    if (Constants.expoConfig?.extra?.testWithoutBackend) {
      const newReport = new Report(reportData);
      const reports = await getReportsLocal();
      setReportsLocal([...reports, newReport]);
      return { id: Math.floor(Math.random() * 1000) };
    }
    const query = `${Constants.expoConfig?.extra?.baseUrl ?? ''}/locations`;
    const response = await axios.post(query, JSON.stringify([reportData]), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch {
    throw new Error('Server-error: POST');
  }
}
