import { render, screen, fireEvent } from '@testing-library/react-native';

import { ThemedRadioButton } from '@/components/ui/ThemedRadioButton';
import * as ColorSchemeHooks from '@/hooks/useColorScheme';

describe('<ThemedRadioButton />', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    render(
      <ThemedRadioButton
        title="Test Radio"
        checked={false}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByText('Test Radio')).toBeVisible();
  });

  test('shows checked state correctly', () => {
    render(
      <ThemedRadioButton
        title="Test Radio"
        checked={true}
        onPress={mockOnPress}
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('handles press events', () => {
    render(
      <ThemedRadioButton
        title="Test Radio"
        checked={false}
        onPress={mockOnPress}
      />
    );

    const radioButton = screen.getByRole('checkbox');
    fireEvent.press(radioButton);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('applies custom styles', () => {
    const customStyle = { marginTop: 10 };

    render(
      <ThemedRadioButton
        title="Test Radio"
        checked={false}
        onPress={mockOnPress}
        style={customStyle}
      />
    );

    const text = screen.getByText('Test Radio');
    expect(text.props.style[2]).toEqual(expect.arrayContaining([customStyle]));
  });

  describe('theme modes', () => {
    const mockUseColorScheme = jest.spyOn(ColorSchemeHooks, 'useColorScheme');

    test('renders correct icons in light mode', () => {
      mockUseColorScheme.mockReturnValue('light');
      render(
        <ThemedRadioButton
          title="Test Radio"
          checked={true}
          onPress={mockOnPress}
        />
      );

      const image = screen.getByTestId('radio-button-icon');
      expect(image.props.source).toEqual({
        testUri: '../../../assets/images/radio-button/checked-light.png'
      });
    });

    test('renders correct icons in dark mode', () => {
      mockUseColorScheme.mockReturnValue('dark');
      render(
        <ThemedRadioButton
          title="Test Radio"
          checked={true}
          onPress={mockOnPress}
        />
      );

      const image = screen.getByTestId('radio-button-icon');
      expect(image.props.source).toEqual({
        testUri: '../../../assets/images/radio-button/checked-dark.png'
      });
    });

    afterAll(() => {
      mockUseColorScheme.mockRestore();
    });
  });
});
