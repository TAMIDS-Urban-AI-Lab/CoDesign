/**
 * Custom hook for loading and managing application fonts using expo-font.
 */

import { useFonts as useFontsHook } from 'expo-font';

/**
 * Hook to load all custom fonts used in the application.
 * @returns {[boolean]} Returns an array with a single boolean indicating whether all fonts are loaded
 * The fonts loaded include:
 * - OpenSans (Bold, Italic, Regular)
 * - Oswald (Regular)
 * - SpaceMono (Regular)
 * - WorkSans (Regular, Italic, Bold, SemiBold)
 */
export function useFonts() {
  return useFontsHook({
    OpenSansSemiBold: require('../assets/fonts/OpenSans-SemiBold.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),
    OpenSansItalic: require('../assets/fonts/OpenSans-Italic.ttf'),
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
    OswaldRegular: require('../assets/fonts/Oswald-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    WorkSansRegular: require('../assets/fonts/WorkSans-Regular.ttf'),
    WorkSansItalic: require('../assets/fonts/WorkSans-Italic.ttf'),
    WorkSansBold: require('../assets/fonts/WorkSans-Bold.ttf'),
    WorkSansSemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf')
  });
}
