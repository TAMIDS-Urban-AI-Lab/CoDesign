export function mockFetchSuccess(data: any) {
  return jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data)
    })
  ) as jest.Mock;
}
export function mockFetchError(errorMessage?: string) {
  return jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.reject(new Error(errorMessage ?? 'Network response was not ok'))
    })
  ) as jest.Mock;
}
