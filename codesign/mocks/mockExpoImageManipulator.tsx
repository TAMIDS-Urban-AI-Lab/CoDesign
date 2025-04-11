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
  const mockSaveAsync = jest.fn(() => {
    return Promise.resolve({
      uri: 'file://path/to/image.jpg',
      width: mockWidth,
      height: mockHeight,
      base64: 'base64string'
    } as ImageResult);
  });
  const mockImageContext = jest.fn(() => {
    return {
      resize: mockResize.mockImplementation(() => mockImageContext()),
      renderAsync: () => mockRenderAsync(mockSaveAsync)
    };
  });

  const mockRenderAsync = jest.fn((mockSaveAsync) =>
    Promise.resolve({
      width: mockWidth,
      height: mockHeight,
      saveAsync: mockSaveAsync
    } as ImageRef)
  );

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
