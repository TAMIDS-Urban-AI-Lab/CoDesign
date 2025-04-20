import { render, screen, fireEvent } from '@testing-library/react-native';

import { ThemedTextInput } from '@/components/ui/ThemedTextInput';

describe('<ThemedTextInput />', () => {
  const mockOnChangeText = jest.fn();

  test('renders with required props', () => {
    render(
      <ThemedTextInput
        label="Test Label"
        placeholder="Test Placeholder"
        onChangeText={mockOnChangeText}
      />
    );
    expect(screen.getByText('Test Label')).toBeVisible();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeVisible();
  });

  test('shows required indicator when required prop is true', () => {
    render(
      <ThemedTextInput
        label="Test Label"
        placeholder="Test Placeholder"
        onChangeText={mockOnChangeText}
        required={true}
      />
    );
    expect(screen.getByText('*')).toBeVisible();
  });

  test('shows error text when provided', () => {
    render(
      <ThemedTextInput
        label="Test Label"
        placeholder="Test Placeholder"
        onChangeText={mockOnChangeText}
        errorText="Test Error"
      />
    );
    expect(screen.getByText('Test Error')).toBeVisible();
  });

  test('handles text input changes', () => {
    render(
      <ThemedTextInput
        label="Test Label"
        placeholder="Test Placeholder"
        onChangeText={mockOnChangeText}
      />
    );
    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.changeText(input, 'test input');
    expect(mockOnChangeText).toHaveBeenCalledWith('test input');
  });

  test('respects multiline and numberOfLines props', () => {
    render(
      <ThemedTextInput
        label="Test Label"
        placeholder="Test Placeholder"
        onChangeText={mockOnChangeText}
        multiline={true}
        numberOfLines={3}
      />
    );
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(3);
  });
});
