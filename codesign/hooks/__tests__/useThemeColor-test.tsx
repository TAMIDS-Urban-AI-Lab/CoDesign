import { useThemeColor } from '@/hooks/useThemeColor';
import * as colorScheme from '@/hooks/useColorScheme';

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
  });

  describe('when no props argument is provided', () => {
    test('selects default dark color', () => {
      (colorScheme.useColorScheme as jest.Mock).mockReturnValue('dark');

      const props = {};
      const colorName = 'background';

      expect(useThemeColor(props, colorName)).toBe('#151718');
    });
  });
});
