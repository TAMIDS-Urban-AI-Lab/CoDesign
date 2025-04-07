import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor
} from '@testing-library/react-native';
import { Coordinates } from '@/types/Report';
import { ModalProvider } from '@/components/provider/ModalProvider';
import { mockMapbox } from '@/mocks/mockMapbox';
import {
  ALBRITTON_BELL_TOWER,
  MEMORIAL_STUDENT_CENTER
} from '@/constants/map/Coordinates';

describe('<SelectLocation />', () => {
  mockMapbox();

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

  const mockSelectedLocation: Coordinates = ALBRITTON_BELL_TOWER;

  test('it initially renders a preview of the map', () => {
    const COMPONENT = initComponent(mockSelectedLocation, jest.fn());
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
    const COMPONENT = initComponent(mockSelectedLocation, jest.fn());
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
    const mockSetSelectedLocation = jest.fn();
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

    // When press button to set new location
    const setLocationButton = await screen.findByTestId('set-location-button');
    fireEvent.press(setLocationButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('select-location-modal')
    );

    // Component should save with correct location
    await waitFor(() => {
      expect(mockSetSelectedLocation).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSetSelectedLocation).toHaveBeenCalledWith(
        MEMORIAL_STUDENT_CENTER
      );
    });
  });
});
