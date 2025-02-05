import { uploadReport } from '@/api/report/uploadReport';
import { ReportFormDetails } from '@/types/Report';

async function createReport(data: ReportFormDetails) {
  try {
    // This is where you would make a request to your API to create the report
    // Backend returns an id associated with the report
    const id = Math.floor(Math.random() * 1000);
    const response = await uploadReport(data);
    console.log(response);
    return { id };
  } catch {
    throw new Error('Failed to create report');
  }
}

export default createReport;
