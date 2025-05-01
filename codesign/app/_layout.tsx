import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import MapboxGL from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from '@/hooks/useFonts';
import { CodesignDataProvider } from '@/components/provider/CodesignDataProvider';
import { ModalProvider } from '@/components/provider/ModalProvider';
import { startMockBackendServer } from '@/mocks/createMockServer';

// When no backend connected in development mode, start the mock server
if (
  process.env.NODE_ENV === 'development' &&
  Constants.expoConfig?.extra?.useMirage
) {
  startMockBackendServer();
}

// Token allows access to Mapbox services
MapboxGL.setAccessToken(Constants.expoConfig?.extra?.mapboxAccessToken ?? '');
MapboxGL.setTelemetryEnabled(false);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true
});

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CodesignDataProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <ActionSheetProvider>
            <ModalProvider>{children}</ModalProvider>
          </ActionSheetProvider>
        </ThemeProvider>
      </CodesignDataProvider>
    </GestureHandlerRootView>
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
