import { mockFetchSuccess, mockFetchError } from '@/mocks/mockFetch';
import { ApiResponse } from '@/types/api';
import { getReportByBoundary } from '@/api/report/getReportByBoundary';
import { ROUTES } from '@/constants/api/routes';
import { ReportFormDetails, Report } from '@/types/Report';
import { createMockedReportFormDetails } from '@/mocks/mockReport';

describe('getReportByBoundary', () => {
  const testProps = {
    west: 1,
    south: 2,
    east: 3,
    north: 4
  };
  const reportData: ReportFormDetails[] = [
    createMockedReportFormDetails(),
    createMockedReportFormDetails(),
    createMockedReportFormDetails()
  ];

  describe('when the fetch is successful', () => {
    beforeAll(() => {
      const successResponse: ApiResponse<ReportFormDetails[]> = {
        status: 200,
        message: 'Success',
        data: reportData
      };
      global.fetch = mockFetchSuccess(successResponse);
    });
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('should call fetch with the correct URL path', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch');

      const expectedUrl = `${ROUTES.REPORT_LOCATION}?west=${testProps.west}&south=${testProps.south}&east=${testProps.east}&north=${testProps.north}`;
      await getReportByBoundary(
        testProps.west,
        testProps.south,
        testProps.east,
        testProps.north
      );
      expect(fetchSpy.mock.calls[0][0]).toMatch(expectedUrl);
    });

    test('should return reports in the correct format', async () => {
      const expectedResponse: Report[] = reportData.map(
        (item) => new Report(item)
      );
      const actualResponse = await getReportByBoundary(
        testProps.west,
        testProps.south,
        testProps.east,
        testProps.north
      );

      expect(actualResponse).toEqual(expectedResponse);
    });
  });
  describe('when the fetch fails', () => {
    beforeAll(() => {
      global.fetch = mockFetchError();
    });
    afterAll(() => {
      jest.resetAllMocks();
    });
    test('should throw an error', async () => {
      await expect(
        getReportByBoundary(
          testProps.west,
          testProps.south,
          testProps.east,
          testProps.north
        )
      ).rejects.toThrow();
    });
  });
});
