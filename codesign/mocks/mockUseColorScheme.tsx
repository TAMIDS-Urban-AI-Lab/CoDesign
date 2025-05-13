/**
 * Mock implementation for useColorScheme hook
 * Provides mock functionality for theme/color scheme detection
 */

export function mockUseColorScheme() {
  /** Mock function for color scheme hook */
  const mockedUseColorScheme = jest.fn();

  // Mock the color scheme hook module
  jest.mock('@/hooks/useColorScheme', () => ({
    useColorScheme: mockedUseColorScheme
  }));

  return {
    mockedUseColorScheme
  };
}
