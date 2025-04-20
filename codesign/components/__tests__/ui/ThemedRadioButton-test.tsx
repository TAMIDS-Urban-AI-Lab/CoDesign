import { render, screen, fireEvent } from '@testing-library/react-native';

import { ThemedRadioButton } from '@/components/ui/ThemedRadioButton';

describe('<ThemedRadioButton />', () => {
  const mockOnPress = jest.fn();

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

    const radioButton = screen.getByRole('checkbox');
    expect(radioButton.props.accessibilityState.checked).toBe(true);
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
    expect(mockOnPress).toHaveBeenCalled();
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
});
