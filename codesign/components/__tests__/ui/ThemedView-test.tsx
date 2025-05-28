import { render, screen } from '@testing-library/react-native';

import { mockUseColorScheme } from '@/mocks/mockUseColorScheme';
import { tamuColors } from '@/constants/Colors';

describe('<ThemedView />', () => {
  const { mockedUseColorScheme } = mockUseColorScheme();
  const { ThemedView } = require('@/components/ui/ThemedView');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default background color in light theme', () => {
    mockedUseColorScheme.mockReturnValue('light');
    render(<ThemedView testID="themed-view" />);
    const view = screen.getByTestId('themed-view');
    expect(view).toBeVisible();
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: tamuColors.white }])
    );
  });

  test('applies custom light color in light theme', () => {
    mockedUseColorScheme.mockReturnValue('light');
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    render(
      <ThemedView
        testID="themed-view"
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );

    const view = screen.getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: lightColor }])
    );
  });

  test('applies custom dark color in dark theme', () => {
    mockedUseColorScheme.mockReturnValue('dark');
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    render(
      <ThemedView
        testID="themed-view"
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );

    const darkView = screen.getByTestId('themed-view');
    expect(darkView.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: darkColor }])
    );
  });

  test('renders with transparent background when transparent prop is true', () => {
    render(<ThemedView testID="themed-view" transparent={true} />);
    const view = screen.getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: tamuColors.transparent }])
    );
  });

  test('merges custom styles with theme styles', () => {
    const customStyle = { width: 100, height: 100 };
    render(<ThemedView testID="themed-view" style={customStyle} />);
    const view = screen.getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([
        { backgroundColor: expect.any(String) },
        customStyle
      ])
    );
  });
});
