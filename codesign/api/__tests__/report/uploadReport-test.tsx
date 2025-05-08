/**
 * @fileoverview Test suite for the uploadReport API module.
 * Tests cover successful report upload scenarios and error handling cases.
 * Uses mock fetch implementations to verify correct API endpoint usage,
 * request payload formatting, and response handling.
 *
 * @module api/__tests__/report/uploadReport
 */

import { mockFetchSuccess, mockFetchError } from '@/mocks/mockFetch';
import { ApiResponse, ReportUploadSuccess } from '@/types/api';
import { ROUTES } from '@/constants/api/routes';
import { uploadReport } from '@/api/report/uploadReport';
import { createMockedReportFormDetails } from '@/mocks/mockReport';
import { ReportFormDetails } from '@/types/Report';

describe('uploadReport', () => {
  const testReportData: ReportFormDetails = createMockedReportFormDetails();
  const testId = 123;

  describe('when the fetch is successful', () => {
    beforeAll(() => {
      const successResponse: ApiResponse<ReportUploadSuccess> = {
        status: 200,
        message: 'Report uploaded successfully',
        data: { id: testId }
      };
      global.fetch = mockFetchSuccess(successResponse);
    });
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('should call fetch with the correct URL and payload', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch');

      await uploadReport(testReportData);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy.mock.calls[0][0]).toMatch(ROUTES.REPORT_LOCATION);
      expect(fetchSpy.mock.calls[0][1]).toMatchObject({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([testReportData])
      });
    });

    test('should resolve with new report id', async () => {
      await expect(uploadReport(testReportData)).resolves.toEqual({
        id: testId
      });
    });
  });

  describe('when the fetch fails', () => {
    beforeAll(() => {
      global.fetch = mockFetchError('Backend error message');
    });
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('should throw the correct error message', async () => {
      await expect(uploadReport(testReportData)).rejects.toThrow(
        'An error occurred while uploading the report.'
      );
    });
  });
});
