import { render, screen, fireEvent } from '@testing-library/react-native';
import { ImageButton } from '@/components/ui/ImageButton';
import { Spacing } from '@/constants/styles/Spacing';
import { Border } from '@/constants/styles/Border';

describe('<ImageButton />', () => {
  const mockSource = { uri: 'test-image.png' };
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    render(<ImageButton source={mockSource} onPress={mockOnPress} />);
    const button = screen.getByTestId('image-button');
    const icon = screen.getByTestId('image-button-icon');
    expect(button).toBeVisible();
    expect(icon).toBeVisible();
  });

  test('applies transparent style when transparent prop is true', () => {
    render(
      <ImageButton source={mockSource} onPress={mockOnPress} transparent />
    );
    const button = screen.getByTestId('image-button');
    expect(button).toHaveStyle({ backgroundColor: '#00000000' });
  });

  test('applies elevated style when elevated prop is true', () => {
    render(<ImageButton source={mockSource} onPress={mockOnPress} elevated />);
    const button = screen.getByTestId('image-button');
    expect(button).toHaveStyle({
      ...Border.elevated,
      borderRadius: '50%'
    });
  });

  test('applies custom size', () => {
    const size = 100;
    render(
      <ImageButton source={mockSource} onPress={mockOnPress} size={size} />
    );
    const button = screen.getByTestId('image-button');
    const icon = screen.getByTestId('image-button-icon');
    expect(button).toHaveStyle({
      width: size + Spacing.large,
      height: size + Spacing.large
    });
    expect(icon).toHaveStyle({ width: size, height: size });
  });

  test('calls onPress when pressed', () => {
    render(<ImageButton source={mockSource} onPress={mockOnPress} />);
    const button = screen.getByTestId('image-button-icon');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
