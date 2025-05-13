/**
 * Mock implementation for expo-image-manipulator
 * Provides mock functionality for image manipulation operations
 */

export function mockExpoImageManipulator({
  mockWidth,
  mockHeight
}: {
  mockWidth: number;
  mockHeight: number;
}) {
  type ImageResult = {
    uri: string;
    width: number;
    height: number;
    base64?: string;
  };
  type ImageRef = {
    width: number;
    height: number;
    saveAsync(options?: any): Promise<ImageResult>;
  };
  const mockResize = jest.fn();

  /** Mock function for saving manipulated image */
  const mockSaveAsync = jest.fn(() => {
    return Promise.resolve({
      uri: 'file://path/to/image.jpg',
      width: mockWidth,
      height: mockHeight,
      base64: 'base64string'
    } as ImageResult);
  });

  /** Mock function for image manipulation context */
  const mockImageContext = jest.fn(() => {
    return {
      resize: mockResize.mockImplementation(() => mockImageContext()),
      renderAsync: () => mockRenderAsync(mockSaveAsync)
    };
  });

  /** Mock function for rendering manipulated image */
  const mockRenderAsync = jest.fn((mockSaveAsync) =>
    Promise.resolve({
      width: mockWidth,
      height: mockHeight,
      saveAsync: mockSaveAsync
    } as ImageRef)
  );

  // Mock the entire image manipulator module
  jest.mock('expo-image-manipulator', () => {
    return {
      __esModule: true,
      ImageManipulator: {
        manipulate: mockImageContext
      },
      SaveFormat: {
        JPEG: 'jpeg',
        PNG: 'png',
        WEBP: 'webp'
      }
    };
  });

  return {
    mockResize,
    mockSaveAsync,
    mockRenderAsync
  };
}
