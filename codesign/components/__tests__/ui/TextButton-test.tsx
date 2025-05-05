import { render, screen, fireEvent } from '@testing-library/react-native';
import { TextButton } from '@/components/ui/TextButton';
import { tamuColors } from '@/constants/Colors';

jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn()
}));

describe('<TextButton />', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    render(<TextButton text="Test Button" onPress={mockOnPress} />);
    expect(screen.getByText('Test Button')).toBeVisible();
  });

  describe('in light mode', () => {
    beforeEach(() => {
      require('@/hooks/useColorScheme').useColorScheme.mockReturnValue('light');
    });

    test('renders primary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="primary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: tamuColors.primaryBrand
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });

    test('renders secondary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="secondary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: '#00000000',
        borderWidth: 2,
        borderColor: tamuColors.primaryBrand
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });

    test('renders tertiary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="tertiary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: '#00000000'
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });
  });

  describe('in dark mode', () => {
    beforeEach(() => {
      require('@/hooks/useColorScheme').useColorScheme.mockReturnValue('dark');
    });

    test('renders primary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="primary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: tamuColors.white
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });

    test('renders secondary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="secondary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: '#00000000',
        borderWidth: 2,
        borderColor: tamuColors.accentGold
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });

    test('renders tertiary button with correct styles', () => {
      render(
        <TextButton
          text="Test Button"
          type="tertiary"
          onPress={mockOnPress}
          testID="button"
        />
      );
      const button = screen.getByTestId('button');
      expect(button).toBeVisible();
      expect(button.props.style[1]).toEqual({
        backgroundColor: '#00000000'
      });
      expect(screen.getByText('Test Button')).toBeVisible();
    });
  });

  test('handles press events', () => {
    render(
      <TextButton text="Test Button" onPress={mockOnPress} testID="button" />
    );

    const button = screen.getByTestId('button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
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
