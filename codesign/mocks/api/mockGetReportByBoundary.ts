import { ApiResponse } from '@/types/api';
import { mockFetchSuccess } from '@/mocks/mockFetch';
import { ReportFormDetails } from '@/types/Report';

export function mockGetReportByBoundarySuccess({
  reportData
}: {
  reportData: ReportFormDetails[];
}) {
  const successResponse: ApiResponse<ReportFormDetails[]> = {
    status: 200,
    message: 'Success',
    data: reportData
  };
  global.fetch = mockFetchSuccess(successResponse);
}
