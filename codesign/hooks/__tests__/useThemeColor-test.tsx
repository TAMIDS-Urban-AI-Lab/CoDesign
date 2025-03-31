import { useThemeColor } from '@/hooks/useThemeColor';
import * as colorScheme from '@/hooks/useColorScheme';
import { tamuColors } from '@/constants/Colors';

describe('useThemeColor()', () => {
  beforeAll(() => {
    jest.mock('@/hooks/useColorScheme', () => ({
      useColorScheme: jest.fn()
    }));
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('when props argument is provided', () => {
    test('selects light color', () => {
      (colorScheme.useColorScheme as jest.Mock).mockReturnValue('light');
      const props = { light: '#AAA', dark: '#BBB' };
      const colorName = 'text';

      expect(useThemeColor(props, colorName)).toBe(props.light);
    });

    test('selects dark color', () => {
      (colorScheme.useColorScheme as jest.Mock).mockReturnValue('dark');
      const props = { light: '#AAA', dark: '#BBB' };
      const colorName = 'text';

      expect(useThemeColor(props, colorName)).toBe(props.dark);
    });
  });

  describe('when no props argument is provided', () => {
    test('selects default light color', () => {
      (colorScheme.useColorScheme as jest.Mock).mockReturnValue('light');

      const props = {};
      const colorName = 'background';

      expect(useThemeColor(props, colorName)).toBe(tamuColors.white);
    });

    test('selects default dark color', () => {
      (colorScheme.useColorScheme as jest.Mock).mockReturnValue('dark');

      const props = {};
      const colorName = 'background';

      expect(useThemeColor(props, colorName)).toBe('#151718');
    });
  });
});
