export function mockUseThemeColor() {
  const mockedUseColorScheme = jest.fn();
  jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: mockedUseColorScheme
  }));

  return {
    mockedUseColorScheme
  };
}
