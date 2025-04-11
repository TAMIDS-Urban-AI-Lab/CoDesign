export function mockUseColorScheme() {
  const mockedUseColorScheme = jest.fn();
  jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: mockedUseColorScheme
  }));

  return {
    mockedUseColorScheme
  };
}
