/**
 * Mock implementation for report upload API
 * Provides mock functionality for report submission endpoint
 */

export function mockUploadReport() {
  const mockedUploadReport = jest.fn(() => Promise.resolve({}));

  // Mock the report upload module
  jest.mock('@/api/report/uploadReport', () => {
    return {
      uploadReport: mockedUploadReport
    };
  });

  return {
    mockedUploadReport
  };
}
