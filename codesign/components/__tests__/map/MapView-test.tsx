import { render } from '@testing-library/react-native';

import { mockUseColorScheme } from '@/mocks/mockUseColorScheme';
import { mockMapbox } from '@/mocks/mockMapbox';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

describe('MapView', () => {
  const { mockedUseColorScheme } = mockUseColorScheme();
  const { mockMapView } = mockMapbox({
    centerCoordinate: ALBRITTON_BELL_TOWER
  });
  const { MapView } = require('@/components/map/MapView');

  beforeEach(() => {
    mockedUseColorScheme.mockClear();
    mockMapView.mockClear();
  });

  const mockedMapRef = null;

  test('it shows light color scheme when in light mode', () => {
    mockedUseColorScheme.mockReturnValue('light');
    render(<MapView ref={mockedMapRef} />);
    expect(mockMapView).toHaveBeenCalledWith(
      expect.objectContaining({
        styleURL: 'mapbox://styles/mapbox/light-v10'
      }),
      mockedMapRef
    );
  });

  test('it shows dark color scheme when in dark mode', () => {
    mockedUseColorScheme.mockReturnValue('dark');
    render(<MapView ref={mockedMapRef} />);
    expect(mockMapView).toHaveBeenCalledWith(
      expect.objectContaining({
        styleURL: 'mapbox://styles/mapbox/dark-v10'
      }),
      mockedMapRef
    );
  });
});
