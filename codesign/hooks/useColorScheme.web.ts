/**
 * Web-specific implementation of the useColorScheme hook.
 * This module provides color scheme detection functionality specifically for web platforms,
 * handling hydration and initial rendering appropriately.
 */

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Custom hook for detecting and managing color scheme on web platforms.
 * This implementation ensures proper hydration during server-side rendering
 * and provides a fallback to 'light' theme before hydration is complete.
 *
 * To support static rendering, this value needs to be re-calculated on the client side for web
 *
 * @returns {'light' | 'dark' | null} The current color scheme preference,
 * returns 'light' before hydration and the actual preference after hydration
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
