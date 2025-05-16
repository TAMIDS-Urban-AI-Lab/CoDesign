/**
 * Mock implementation for expo-router
 * Provides mock navigation functionality for testing
 */

export function mockExpoRouter() {
  const mockedRouterReplace = jest.fn();

  // Mock the entire expo-router module
  jest.mock('expo-router', () => {
    return {
      __esModule: true,
      useRouter: jest.fn(() => {
        return {
          replace: mockedRouterReplace
        };
      })
    };
  });

  return {
    mockedRouterReplace
  };
}
