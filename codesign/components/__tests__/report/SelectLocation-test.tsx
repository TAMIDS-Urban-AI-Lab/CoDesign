import { render, screen, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';

import { Coordinates } from '@/types/Report';
import { ModalProvider } from '@/components/provider/ModalProvider';

describe('<SelectLocation />', () => {
  const mockSelectedLocation: Coordinates = [
    -96.35119602985726, 30.607255922217114
  ];
  const mockSetSelectedLocation = jest.fn();

  test('it initially renders a preview of the map', () => {
    const mockMapView = ({ children }: any) => (
      <View testID="mapview-mock"> MapView Mock {children}</View>
    );
    const mockCamera = (props: any) => (
      <View testID="camera-mock"> Camera Mock</View>
    );
    const mockMarkerView = (props: any) => (
      <View testID="marker-mock"> MarkerView Mock</View>
    );

    jest.mock('@rnmapbox/maps', () => {
      return {
        __esModule: true,
        default: {
          setAccessToken: jest.fn()
        },
        MapView: mockMapView,
        Camera: mockCamera,
        MarkerView: mockMarkerView,
        StyleURL: {
          Light: 'mapbox://styles/mapbox/light-v10',
          Dark: 'mapbox://styles/mapbox/dark-v10'
        }
      };
    });

    const SelectLocation =
      require('@/components/report/SelectLocation').SelectLocation;
    const COMPONENT = (
      <ModalProvider>
        <SelectLocation
          selectedLocation={mockSelectedLocation}
          setSelectedLocation={mockSetSelectedLocation}
        />
      </ModalProvider>
    );
    render(COMPONENT);

    expect(screen.getByTestId('location-preview')).toBeVisible();
    expect(screen.getByTestId('location-preview')).toHaveStyle({
      height: 120
    });
    expect(screen.getByTestId('mapview-mock')).toBeVisible();
    expect(screen.getByTestId('marker-mock')).toBeVisible();
    expect(screen.getByText('Tap to select location')).toBeVisible();
  });

  test.skip('it opens the modal when the preview is pressed', () => {
    render(COMPONENT);

    // When click on the preview
    fireEvent.press(screen.getByTestId('location-preview'));

    // Cover the preview with the modal and mapbox map
    expect(screen.getByTestId('location-preview')).not.toBeVisible();
    expect(screen.getByTestId('select-location-modal')).toBeVisible();
    expect(screen.getByTestId('mapbox-mapview')).toBeVisible();
    // Pin icon is a static image over the map, not a marker
    expect(screen.getByTestId('mapbox-marker')).not.toBeVisible();
    // There are two buttons
    expect(screen.getByText('Use Current Location')).toBeVisible();
    expect(screen.getByText('Set Location')).toBeVisible();
  });

  test.skip('it closes the modal when the close button is pressed', () => {
    render(COMPONENT);

    // When click on the preview
    fireEvent.press(screen.getByTestId('location-preview'));

    // Close the modal
    fireEvent.press(screen.getByTestId('close-modal-button'));

    // The modal should not be visible anymore
    expect(screen.getByTestId('select-location-modal')).not.toBeVisible();
  });

  test.skip('it saves the location when the "Set Location" button is pressed', () => {
    render(COMPONENT);

    // When click on the preview
    fireEvent.press(screen.getByTestId('location-preview'));

    // Set the location
    fireEvent.press(screen.getByText('Set Location'));

    // The location should be set
    expect(mockSetSelectedLocation).toHaveBeenCalled();
  });

  test.skip('it centers the map on the current location when the "Use Current Location" button is pressed', () => {
    render(COMPONENT);

    // When click on the preview
    fireEvent.press(screen.getByTestId('location-preview'));

    // Use the current location
    fireEvent.press(screen.getByText('Use Current Location'));

    // The current location should be set
    expect(mockSetSelectedLocation).toHaveBeenCalled();
  });
});
