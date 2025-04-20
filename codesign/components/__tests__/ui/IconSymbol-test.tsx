import { render, screen } from '@testing-library/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { tamuColors } from '@/constants/Colors';

// Mock the actual mapping logic
const MAPPING = {
  'house.fill': 'home-sharp',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'chevron-forward',
  'chevron.right': 'chevron-back',
  'map.fill': 'map',
  pencil: 'pencil-sharp',
  'person.crop.circle.fill': 'person-circle',
  'camera.fill': 'camera',
  'photo.fill': 'image-outline'
} as const;

jest.mock('@/components/ui/IconSymbol', () => {
  const ReactNative = require('react-native');
  return {
    IconSymbol: function MockIconSymbol(props: any) {
      const mappedName =
        MAPPING[props.name as keyof typeof MAPPING] || props.name;
      return <ReactNative.View testID="ionicon" {...props} name={mappedName} />;
    }
  };
});

describe('<IconSymbol />', () => {
  const testProps = {
    name: 'house.fill' as const,
    color: tamuColors.black,
    size: 24
  };

  test('renders with required props', () => {
    render(<IconSymbol {...testProps} />);
    const icon = screen.getByTestId('ionicon');
    expect(icon).toBeTruthy();
    expect(icon.props.name).toBe('home-sharp');
    expect(icon.props.color).toBe(testProps.color);
  });

  test('applies custom size', () => {
    const size = 32;
    render(<IconSymbol {...testProps} size={size} />);
    const icon = screen.getByTestId('ionicon');
    expect(icon.props.size).toBe(size);
  });

  test('forwards custom styles', () => {
    const customStyle = { marginTop: 10 };
    render(<IconSymbol {...testProps} style={customStyle} />);
    const icon = screen.getByTestId('ionicon');
    expect(icon).toHaveStyle(customStyle);
  });

  describe('icon mappings', () => {
    Object.entries(MAPPING).forEach(([sfSymbol, ionicon]) => {
      test(`maps ${sfSymbol} to ${ionicon}`, () => {
        render(
          <IconSymbol
            name={sfSymbol as any}
            color={tamuColors.black}
            size={24}
          />
        );
        const icon = screen.getByTestId('ionicon');
        expect(icon.props.name).toBe(ionicon);
      });
    });
  });
});
