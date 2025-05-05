/**
 * Custom hook for managing theme colors in the application.
 * This hook handles the dynamic color switching between light and dark modes,
 * supporting both system theme preferences and custom color overrides.
 *
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Hook to get the appropriate color value based on the current theme and optional color overrides.
 *
 * @param props - Object containing optional light and dark mode color overrides
 * @param props.light - Optional color value to use in light mode
 * @param props.dark - Optional color value to use in dark mode
 * @param colorName - Key of the color to retrieve from the Colors constant
 * @returns The appropriate color value based on the current theme and any overrides
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
