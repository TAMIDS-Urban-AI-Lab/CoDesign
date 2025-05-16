/**
 * Mock implementation for expo-media-library
 * Provides mock functionality for saving media to device library
 */

export function mockExpoMediaLibrary() {
  const mockSaveToLibraryAsync = jest.fn(() => Promise.resolve());

  // Mock the entire expo-media-library module
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
