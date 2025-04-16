import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  within
} from '@testing-library/react-native';

import { Coordinates } from '@/types/Report';
import { ModalProvider } from '@/components/provider/ModalProvider';
import { mockMapbox } from '@/mocks/mockMapbox';
import { mockExpoLocation } from '@/mocks/mockExpoLocation';
import {
  ALBRITTON_BELL_TOWER,
  MEMORIAL_STUDENT_CENTER,
  SBISA_DINING_HALL
} from '@/constants/map/Coordinates';

describe('<SelectLocation />', () => {
  const mockedCurrentLocation: Coordinates = SBISA_DINING_HALL;

  const { renderCameraCenter } = mockMapbox({
    centerCoordinate: MEMORIAL_STUDENT_CENTER
  });
  mockExpoLocation({ currentPosition: mockedCurrentLocation });

  /* Must mock mapbox components prior to importing SelectLocation */
  const SelectLocation =
    require('@/components/report/SelectLocation').SelectLocation;
  const initComponent = (
    selectedLocation: Coordinates,
    setSelectedLocation: CallableFunction
  ) => (
    <ModalProvider>
      <SelectLocation
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </ModalProvider>
  );

  test('it initially renders a preview of the map', () => {
    const COMPONENT = initComponent(ALBRITTON_BELL_TOWER, jest.fn());
    render(COMPONENT);

    expect(screen.getByTestId('location-preview')).toBeVisible();
    expect(screen.getByTestId('location-preview')).toHaveStyle({
      height: 120
    });
    expect(screen.getByTestId('mapview-mock')).toBeVisible();
    expect(screen.getByTestId('marker-mock')).toBeVisible();
    expect(screen.getByText('Tap to select location')).toBeVisible();
  });

  test('it opens the modal and closes the modal successfully', async () => {
    const COMPONENT = initComponent(ALBRITTON_BELL_TOWER, jest.fn());
    render(COMPONENT);

    // When click on the preview
    const previewPressable = await screen.findByTestId(
      'location-preview-pressable'
    );
    fireEvent.press(previewPressable);

    // then cover the preview with the modal and mapbox map
    expect(screen.getByTestId('select-location-modal')).toBeVisible();
    expect(screen.getAllByTestId('mapview-mock')).toHaveLength(2);

    // and pin icon is a static image over the map, not a marker
    expect(screen.getByTestId('select-location-pin-image')).toBeVisible();

    // and there are two buttons
    expect(screen.getByText('Use Current Location')).toBeVisible();
    expect(screen.getByText('Set Location')).toBeVisible();

    // When close the modal to go back
    const backButton = await screen.findByTestId('close-modal-button');
    fireEvent.press(backButton);

    // then the modal should not be visible anymore
    expect(screen.queryByTestId('select-location-modal')).toBeNull();
  });

  test('it saves the location when the "Set Location" button is pressed', async () => {
    // At first, map centers on Bell Tower
    let mockSelectedLocation = ALBRITTON_BELL_TOWER;
    const mockSetSelectedLocation = jest.fn(
      (location) => (mockSelectedLocation = location)
    );
    const COMPONENT = initComponent(
      mockSelectedLocation,
      mockSetSelectedLocation
    );
    render(COMPONENT);

    // When click on the preview
    const previewPressable = await screen.findByTestId('location-preview');
    fireEvent.press(previewPressable);
    // the modal with full screen map appears
    expect(screen.getByTestId('select-location-modal')).toBeVisible();

    // When press button to set location to Memorial Student Center
    const setLocationButton = await screen.findByTestId('set-location-button');
    fireEvent.press(setLocationButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('select-location-modal')
    );

    // Map should save location as Memorial Student Center
    await waitFor(() => {
      expect(mockSetSelectedLocation).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSelectedLocation).toEqual(MEMORIAL_STUDENT_CENTER);
    });
  });

  test('it centers the map on the current location when the "Use Current Location" button is pressed', async () => {
    // At first, map centers on Bell Tower
    const COMPONENT = initComponent(ALBRITTON_BELL_TOWER, jest.fn());
    render(COMPONENT);

    // When click on the preview
    fireEvent.press(screen.getByTestId('location-preview'));
    // the modal with full screen map appears
    expect(screen.getByTestId('select-location-modal')).toBeVisible();

    // When click the 'Use Current Location' button'
    const useCurrentLocationButton = await screen.findByText(
      'Use Current Location'
    );
    fireEvent.press(useCurrentLocationButton);

    // then the map should center on Sbisa Dining Hall
    await waitFor(() => {
      const selectLocationModal = screen.getByTestId('select-location-modal');
      const cameraMock = within(selectLocationModal).getByTestId('camera-mock');
      expect(cameraMock).toHaveTextContent(
        renderCameraCenter(SBISA_DINING_HALL)
      );
    });
  });
});
