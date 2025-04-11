import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { mockMapbox } from '@/mocks/mockMapbox';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

describe('MarkerView', () => {
  const { mockMarkerView } = mockMapbox({
    centerCoordinate: ALBRITTON_BELL_TOWER
  });

  const { MarkerView } = require('@/components/map/MarkerView');

  test('passes in coordinates to Mapbox MarkerView component', () => {
    // Given a MarkerView with coordinates
    render(<MarkerView coordinates={ALBRITTON_BELL_TOWER} />);

    // Then the Mapbox MarkerView should be called with the correct coordinates
    expect(mockMarkerView).toHaveBeenCalledWith(
      expect.objectContaining({
        coordinate: ALBRITTON_BELL_TOWER
      }),
      expect.anything()
    );
  });

  test('calls onPress when pressed', async () => {
    const mockOnPress = jest.fn();
    render(
      <MarkerView coordinates={ALBRITTON_BELL_TOWER} onPress={mockOnPress} />
    );

    // When the marker is pressed
    const markerViewPressable = await screen.findByTestId(
      'marker-view-pressable'
    );
    fireEvent.press(markerViewPressable);

    // Then the onPress function should be called
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('renders children so they are visible', () => {
    // Given a MarkerView with children
    render(
      <MarkerView coordinates={ALBRITTON_BELL_TOWER}>
        <Text>Test Marker</Text>
      </MarkerView>
    );

    // Then the children should be visible
    const markerText = screen.getByText('Test Marker');
    expect(markerText).toBeVisible();
  });
});
