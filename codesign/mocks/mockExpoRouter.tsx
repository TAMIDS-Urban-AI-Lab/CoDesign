export function mockExpoRouter() {
  const mockedRouterReplace = jest.fn();

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
