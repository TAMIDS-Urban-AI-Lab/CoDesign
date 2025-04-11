export function mockExpoMediaLibrary() {
  const mockSaveToLibraryAsync = jest.fn(() => Promise.resolve());

  jest.mock('expo-media-library', () => {
    return {
      __esModule: true,
      saveToLibraryAsync: mockSaveToLibraryAsync
    };
  });

  return {
    mockSaveToLibraryAsync
  };
}
