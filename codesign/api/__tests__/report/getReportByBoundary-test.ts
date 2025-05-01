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
    createMockedReportFormDetails({ id: 1 }),
    createMockedReportFormDetails({ id: 2 }),
    createMockedReportFormDetails({ id: 3 })
  ];

  describe('when the fetch is successful', () => {
    beforeEach(() => {
      const successResponse: ApiResponse<ReportFormDetails[]> = {
        status: 200,
        message: 'Success',
        data: reportData
      };
      global.fetch = mockFetchSuccess(successResponse);
    });
    afterEach(() => {
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
      expect(fetchSpy).toHaveBeenCalledTimes(1);
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

      // response is formatted as Report objects
      expect(actualResponse).toEqual(expectedResponse);
      expect(actualResponse[0]).toBeInstanceOf(Report);
      // and provided in the same order
      expect(actualResponse[0].getId()).toEqual(reportData[0].id);
      expect(actualResponse[1].getId()).toEqual(reportData[1].id);
      expect(actualResponse[2].getId()).toEqual(reportData[2].id);
    });
  });
  describe('when the fetch fails', () => {
    beforeEach(() => {
      global.fetch = mockFetchError('Backend error message');
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    test('should throw the correct error message', async () => {
      await expect(
        getReportByBoundary(
          testProps.west,
          testProps.south,
          testProps.east,
          testProps.north
        )
      ).rejects.toThrow('An error occurred while fetching reports.');
    });
  });
});
