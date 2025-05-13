import { Coordinates } from '@/types/Report';

/**
 * Mock out the expo-location library
 * Must be called BEFORE testing any components that use expo-location
 */
export function mockExpoLocation({
  currentPosition
}: {
  currentPosition: Coordinates;
}) {
  /** Location coordinates with accuracy and sensor data */
  type LocationObjectCoords = {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };

  /** Complete location object with coordinates and metadata */
  type LocationObject = {
    coords: LocationObjectCoords;
    timestamp: number;
    mocked?: boolean;
  };

  /** Mock function that returns current position with provided coordinates */
  const mockedGetCurrentPositionAsync = jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: currentPosition[1],
        longitude: currentPosition[0]
      }
    } as LocationObject)
  );

  // Mock the entire expo-location module
  jest.mock('expo-location', () => {
    return {
      __esModule: true,
      /** Mock function that always grants location permissions */
      requestForegroundPermissionsAsync: jest.fn(() =>
        Promise.resolve({
          status: 'granted'
        })
      ),
      getCurrentPositionAsync: mockedGetCurrentPositionAsync
    };
  });

  return;
}
