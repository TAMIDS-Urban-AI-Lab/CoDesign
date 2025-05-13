/**
 * Mock implementation for expo-image-picker
 * Provides mock functionality for camera and image library access with permissions
 */

export function mockExpoImagePicker({
  mockWidth,
  mockHeight
}: {
  mockWidth: number;
  mockHeight: number;
}) {
  /** Returns mock granted permission response */
  const grantPermission = () => [
    { status: 'granted' },
    jest.fn(() => Promise.resolve({ status: 'granted' }))
  ];

  /** Returns mock denied permission response */
  const denyPermission = () => [
    { status: 'denied' },
    jest.fn(() => Promise.resolve({ status: 'denied' }))
  ];

  type ImagePickerResult = {
    canceled: boolean;
    assets: ImagePickerAsset[];
  };

  type ImagePickerAsset = any;

  /** Mock hooks for permission management */
  const mockMediaLibraryPermissions = jest.fn(grantPermission);
  const mockCameraPermissions = jest.fn();

  /** Mock function for launching image library picker */
  const mockLaunchImageLibraryAsync = jest.fn(() => {
    const response: ImagePickerResult = {
      assets: [
        {
          uri: 'file://path/to/image.jpg',
          width: mockWidth,
          height: mockHeight,
          fileName: 'image.jpg',
          type: 'image/jpeg'
        }
      ],
      canceled: false
    };
    return Promise.resolve(response);
  });

  /** Mock function for launching camera */
  const mockLaunchCameraAsync = jest.fn(() => {
    const response: ImagePickerResult = {
      assets: [
        {
          uri: 'file://path/to/image.jpg',
          width: mockWidth,
          height: mockHeight,
          fileName: 'image.jpg',
          type: 'image/jpeg'
        }
      ],
      canceled: false
    };
    return Promise.resolve(response);
  });

  // Mock the entire expo-image-picker module
  jest.mock('expo-image-picker', () => {
    return {
      __esModule: true,
      useMediaLibraryPermissions: mockMediaLibraryPermissions,
      useCameraPermissions: mockCameraPermissions,
      launchImageLibraryAsync: mockLaunchImageLibraryAsync,
      launchCameraAsync: mockLaunchCameraAsync
    };
  });

  return {
    grantPermission,
    denyPermission,
    mockMediaLibraryPermissions,
    mockCameraPermissions,
    mockLaunchImageLibraryAsync,
    mockLaunchCameraAsync
  };
}
