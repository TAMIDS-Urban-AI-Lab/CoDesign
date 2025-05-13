import { render, screen } from '@testing-library/react-native';
import * as ColorSchemeHook from '@/hooks/useColorScheme';

import { ThemedView } from '@/components/ui/ThemedView';
import { tamuColors } from '@/constants/Colors';

describe('<ThemedView />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default background color in light theme', () => {
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('light');
    render(<ThemedView testID="themed-view" />);
    const view = screen.getByTestId('themed-view');
    expect(view).toBeVisible();
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: tamuColors.white }])
    );
  });

  test('applies custom light color in light theme', () => {
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('light');
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
    const lightColor = '#ffffff';
    const darkColor = '#000000';
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('dark');
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
