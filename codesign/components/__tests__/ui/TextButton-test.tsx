import { render, screen, fireEvent } from '@testing-library/react-native';

import { TextButton } from '@/components/ui/TextButton';

describe('<TextButton />', () => {
  const mockOnPress = jest.fn();

  test('renders with required props', () => {
    render(<TextButton text="Test Button" onPress={mockOnPress} />);

    expect(screen.getByText('Test Button')).toBeVisible();
  });

  test('renders with different button types', () => {
    const types = ['primary', 'secondary', 'tertiary'] as const;

    types.forEach((type) => {
      render(
        <TextButton
          text="Test Button"
          type={type}
          onPress={mockOnPress}
          testID="button"
        />
      );

      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
    });
  });

  test('handles press events', () => {
    render(
      <TextButton text="Test Button" onPress={mockOnPress} testID="button" />
    );

    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('applies custom styles', () => {
    const customStyle = { width: 200 };

    render(
      <TextButton
        text="Test Button"
        onPress={mockOnPress}
        style={customStyle}
        testID="button"
      />
    );

    const button = screen.getByTestId('button');
    expect(button.props.style).toEqual(expect.arrayContaining([customStyle]));
  });

  test('renders with smallCaps disabled', () => {
    render(
      <TextButton text="Test Button" onPress={mockOnPress} smallCaps={false} />
    );

    expect(screen.getByText('Test Button')).toBeVisible();
  });
});
