import { render, screen, fireEvent } from '@testing-library/react-native';

import { mockUseColorScheme } from '@/mocks/mockUseColorScheme';

describe('<ThemedRadioButton />', () => {
  const { mockedUseColorScheme } = mockUseColorScheme();
  const { ThemedRadioButton } = require('@/components/ui/ThemedRadioButton');
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
    test('renders correct icons in light mode', () => {
      mockedUseColorScheme.mockReturnValue('light');
      render(
        <ThemedRadioButton
          title="Test Radio"
          checked={true}
          onPress={mockOnPress}
        />
      );

      const image = screen.getByTestId('radio-button-icon');
      expect(image.props.source.testUri).toMatch(
        /radio-button\/checked-light\.png$/
      );
    });

    test('renders correct icons in dark mode', () => {
      mockedUseColorScheme.mockReturnValue('dark');
      render(
        <ThemedRadioButton
          title="Test Radio"
          checked={true}
          onPress={mockOnPress}
        />
      );

      const image = screen.getByTestId('radio-button-icon');
      expect(image.props.source.testUri).toMatch(
        /radio-button\/checked-dark\.png$/
      );
    });
  });
});
