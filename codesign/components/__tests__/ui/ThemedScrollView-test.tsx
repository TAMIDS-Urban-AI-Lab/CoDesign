import { render, screen } from '@testing-library/react-native';

import { ThemedScrollView } from '@/components/ui/ThemedScrollView';

describe('<ThemedScrollView />', () => {
  test('renders with default props', () => {
    render(<ThemedScrollView testID="scroll-view" />);

    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView).toBeVisible();
  });

  test('applies custom light and dark colors', () => {
    const lightColor = '#ffffff';
    const darkColor = '#000000';

    render(
      <ThemedScrollView
        testID="scroll-view"
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );

    const scrollView = screen.getByTestId('scroll-view');
    expect(scrollView.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: expect.any(String) }])
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
