import { StyleSheet, Image, type ViewProps } from 'react-native';
import { Camera } from '@rnmapbox/maps';

import { MapView } from '@/components/map/MapView';
import { Coordinates } from '@/types/Report';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { ThemedText } from '@/components/ThemedText';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';
import { ThemedView } from '@/components/ThemedView';
import { MarkerView } from '@/components/map/MarkerView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Spacing } from '@/constants/styles/Spacing';

const PREVIEW_HEIGHT = 120;

const PIN_ICON_SRC = {
  light: require('@/assets/images/location-dot-light.png'),
  dark: require('@/assets/images/location-dot-dark.png')
};

type SelectLocationProps = {
  style?: ViewProps['style'];
  selectedLocation?: Coordinates;
  setSelectedLocation?: (location: Coordinates) => void;
};

export function SelectLocation({
  style,
  selectedLocation,
  setSelectedLocation
}: SelectLocationProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const pinLocation: Coordinates = selectedLocation ?? ALBRITTON_BELL_TOWER;
  const mapCenter = [pinLocation[0], pinLocation[1] - 0.001] as Coordinates;

  return (
    <>
      <ThemedView style={[styles.container, style]}>
        <ThemedView style={[styles.roundCorner, style]}>
          <MapView style={[styles.map]}>
            <Camera
              zoomLevel={14}
              centerCoordinate={mapCenter}
              animationMode="moveTo"
              animationDuration={0}
            />
            <MarkerView coordinates={pinLocation}>
              <Image
                source={PIN_ICON_SRC[colorScheme]}
                style={styles.pinImage}
              ></Image>
            </MarkerView>
          </MapView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.messageContainer]} transparent={true}>
        <ThemedText type="feedback">Tap to select location</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: PREVIEW_HEIGHT,
    ...Border.roundedLarge,
    ...Border.elevatedSmall
  },
  roundCorner: {
    ...Layout.flex,
    ...Border.roundedLarge,
    overflow: 'hidden'
  },
  map: {
    height: '150%'
  },
  pinImage: {
    width: 24,
    height: 24
  },
  messageContainer: {
    ...Layout.center,
    ...Layout.flex,
    marginTop: Spacing.medium
  }
});
