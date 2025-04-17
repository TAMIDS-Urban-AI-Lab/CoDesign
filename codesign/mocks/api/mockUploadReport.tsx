import { ReportUploadSuccess } from '@/types/api';

export function mockUploadReportSuccess(returnData: ReportUploadSuccess) {
  const mockedUploadReportSuccess = jest.fn(() => {
    return Promise.resolve(returnData);
  });

  jest.mock('@/api/report/uploadReport', () => {
    return {
      uploadReport: mockedUploadReportSuccess
    };
  });
}
