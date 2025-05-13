/**
 * Mock implementation for report boundary API
 * Provides mock data for fetching reports within geographical boundaries
 */

/** Creates a successful mock response with sample report data */
export function mockGetReportByBoundarySuccess() {
  jest.mock('@/api/report/getReportByBoundary', () => {
    const { createMockedReportFormDetails } = require('@/mocks/mockReport');
    const { Report } = require('@/types/Report');
    // Create sample reports with sequential IDs
    const reportData = [
      createMockedReportFormDetails({ id: 1 }),
      createMockedReportFormDetails({ id: 2 }),
      createMockedReportFormDetails({ id: 3 })
    ];
    const mockedReports = jest.fn(() =>
      Promise.resolve(reportData.map((item) => new Report(item)))
    );
    return {
      getReportByBoundary: mockedReports
    };
  });
}
