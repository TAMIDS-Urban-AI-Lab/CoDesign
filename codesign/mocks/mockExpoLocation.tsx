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
  type LocationObjectCoords = {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };

  type LocationObject = {
    coords: LocationObjectCoords;
    timestamp: number;
    mocked?: boolean;
  };

  const mockedGetCurrentPositionAsync = jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: currentPosition[1],
        longitude: currentPosition[0]
      }
    } as LocationObject)
  );

  jest.mock('expo-location', () => {
    return {
      __esModule: true,
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
