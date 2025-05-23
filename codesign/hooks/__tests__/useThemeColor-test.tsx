/**
 * Unit tests for the useThemeColor hook.
 *
 * These tests verify the hook's functionality for:
 * - Handling custom color props for both light and dark themes
 * - Falling back to default colors when no props are provided
 * - Proper theme selection based on the system color scheme
 */

import { tamuColors } from '@/constants/Colors';
import { mockUseColorScheme } from '@/mocks/mockUseColorScheme';

describe('useThemeColor()', () => {
  const { mockedUseColorScheme } = mockUseColorScheme();

  beforeEach(() => {
    mockedUseColorScheme.mockClear();
  });

  const { useThemeColor } = require('@/hooks/useThemeColor');
  describe('when props argument is provided', () => {
    test('selects light color', () => {
      mockedUseColorScheme.mockReturnValue('light');
      const props = { light: '#AAA', dark: '#BBB' };
      const colorName = 'text';

      expect(useThemeColor(props, colorName)).toBe(props.light);
    });

    test('selects dark color', () => {
      mockedUseColorScheme.mockReturnValue('dark');
      const props = { light: '#AAA', dark: '#BBB' };
      const colorName = 'text';

      expect(useThemeColor(props, colorName)).toBe(props.dark);
    });
  });

  describe('when no props argument is provided', () => {
    test('selects default light color', () => {
      mockedUseColorScheme.mockReturnValue('light');
      const props = {};
      const colorName = 'background';

      expect(useThemeColor(props, colorName)).toBe(tamuColors.white);
    });

    test('selects default dark color', () => {
      mockedUseColorScheme.mockReturnValue('dark');
      const props = {};
      const colorName = 'background';

      expect(useThemeColor(props, colorName)).toBe('#151718');
    });
  });
});
