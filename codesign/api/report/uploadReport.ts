import { ReportFormDetails } from '@/types/Report';
import { constructQueryString, ROUTES } from '@/constants/api/routes';

/**
 * Upload report to the server
 * @param reports
 */
export async function uploadReport(reportData: ReportFormDetails) {
  try {
    const query = constructQueryString(ROUTES.REPORT_LOCATION);

    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([reportData])
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch {
    throw new Error('An error occurred while uploading the report.');
  }
}
