import { ReportFormDetails } from '@/types/Report';

async function createReport(data: ReportFormDetails) {
  console.log('createReport');
  console.log(data);

  // This is where you would make a request to your API to create the report
  // Backend returns an id associated with the report
  const id = Math.floor(Math.random() * 1000);
  return { id };
}

export default createReport;
