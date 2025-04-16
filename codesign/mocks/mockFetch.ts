export function mockFetchSuccess(data: any, delay = 0) {
  return jest.fn(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve(data)
        });
      }, delay);
    });
  }) as jest.Mock;
}
export function mockFetchError(errorMessage: string, delay = 0) {
  return jest.fn(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.reject(new Error(errorMessage))
        });
      }, delay);
    });
  }) as jest.Mock;
}
