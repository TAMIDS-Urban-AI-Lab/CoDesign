import { render, screen } from '@testing-library/react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import { tamuColors } from '@/constants/Colors';

describe('<ThemedView />', () => {
  test('renders with default background color', () => {
    render(<ThemedView testID="themed-view" />);
    const view = screen.getByTestId('themed-view');
    expect(view).toBeVisible();
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: expect.any(String) }])
    );
  });

  test('applies custom light and dark colors', () => {
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
      expect.arrayContaining([{ backgroundColor: expect.any(String) }])
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
