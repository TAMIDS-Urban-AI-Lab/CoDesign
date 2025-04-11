import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import { View } from 'react-native';

/**
 * Mock out the @rnmapbox/maps library
 * mockMapBox() must be called BEFORE importing any components that use @rnmapbox/maps
 */
export function mockMapbox({
  centerCoordinate
}: {
  centerCoordinate: Position;
}) {
  const mockMapView = jest.fn(function ({ children }: any, ref: any) {
    if (ref) {
      ref.current = {
        getCenter: jest.fn(() => Promise.resolve(centerCoordinate))
      };
    }
    return <View testID="mapview-mock"> MapView Mock {children}</View>;
  });

  const renderCameraCenter = (coordinate: Position) => {
    return `Camera Mock ${JSON.stringify(coordinate)}`;
  };

  const mockCamera = jest.fn(function ({
    centerCoordinate
  }: {
    centerCoordinate: Position;
  }) {
    return (
      <View testID="camera-mock">{renderCameraCenter(centerCoordinate)}</View>
    );
  });

  const mockMarkerView = jest.fn(function (props: any) {
    return <View testID="marker-mock">MarkerView Mock</View>;
  });

  jest.mock('@rnmapbox/maps', () => {
    const { forwardRef } = jest.requireActual('react');
    return {
      __esModule: true,
      default: {
        setAccessToken: jest.fn()
      },
      MapView: forwardRef(mockMapView),
      Camera: mockCamera,
      MarkerView: mockMarkerView,
      StyleURL: {
        Light: 'mapbox://styles/mapbox/light-v10',
        Dark: 'mapbox://styles/mapbox/dark-v10'
      }
    };
  });

  return { renderCameraCenter, mockMapView };
}
