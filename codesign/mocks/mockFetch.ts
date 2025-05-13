/**
 * Mock implementations for fetch API
 * Provides utilities for simulating successful and failed HTTP requests
 */

/** Creates a mock fetch that resolves with provided data after optional delay */
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

/** Creates a mock fetch that rejects with provided error message after optional delay */
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
