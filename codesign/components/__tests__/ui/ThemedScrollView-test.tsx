import { render, screen } from '@testing-library/react-native';

import { ThemedScrollView } from '@/components/ui/ThemedScrollView';
import * as ColorSchemeHook from '@/hooks/useColorScheme';

describe('<ThemedScrollView />', () => {
  const lightColor = '#ffffff';
  const darkColor = '#000000';

  test('renders with default props', () => {
    render(<ThemedScrollView testID="scroll-view" />);

    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView).toBeVisible();
  });

  test('applies custom light color in light theme', () => {
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('light');
    render(
      <ThemedScrollView
        testID="scroll-view"
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );

    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: lightColor }])
    );
  });

  test('applies custom dark color in dark theme', () => {
    jest.spyOn(ColorSchemeHook, 'useColorScheme').mockReturnValue('dark');
    render(
      <ThemedScrollView
        testID="scroll-view"
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );

    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: darkColor }])
    );
  });

  test('merges custom styles with theme styles', () => {
    const customStyle = { width: 100, height: 100 };
    render(<ThemedScrollView testID="scroll-view" style={customStyle} />);
    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView.props.style).toEqual(
      expect.arrayContaining([
        { backgroundColor: expect.any(String) },
        customStyle
      ])
    );
  });
});
