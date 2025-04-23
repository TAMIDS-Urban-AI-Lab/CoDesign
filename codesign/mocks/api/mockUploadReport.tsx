export function mockUploadReport() {
  const mockedUploadReport = jest.fn(() => Promise.resolve({}));

  jest.mock('@/api/report/uploadReport', () => {
    return {
      uploadReport: mockedUploadReport
    };
  });

  return {
    mockedUploadReport
  };
}
