export function mockExpoImagePicker({
  mockWidth,
  mockHeight
}: {
  mockWidth: number;
  mockHeight: number;
}) {
  const grantPermission = () => [
    { status: 'granted' },
    jest.fn(() => Promise.resolve({ status: 'granted' }))
  ];

  const denyPermission = () => [
    { status: 'denied' },
    jest.fn(() => Promise.resolve({ status: 'denied' }))
  ];

  type ImagePickerResult = {
    canceled: boolean;
    assets: ImagePickerAsset[];
  };

  type ImagePickerAsset = any;

  const mockMediaLibraryPermissions = jest.fn(grantPermission);
  const mockCameraPermissions = jest.fn();
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
