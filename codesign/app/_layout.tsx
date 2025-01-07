import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from '@/hooks/useFonts';
import { CodesignDataProvider } from '@/components/CodesignDataProvider';

// Set the access token from app.json
MapboxGL.setAccessToken(Constants.expoConfig?.extra?.mapboxAccessToken ?? '');
MapboxGL.setTelemetryEnabled(false);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function App({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CodesignDataProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </CodesignDataProvider>
  );
}

export default function RootLayout() {
  return (
    <App>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </App>
  );
}
