import { type ViewProps, Pressable, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { PropsWithChildren } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { tamuColors } from '@/constants/Colors';
import { MapDataPoint } from '@/components/map/MapView';

type MarkerViewProps = PropsWithChildren<{
  style?: ViewProps['style'];
  point: MapDataPoint;
  onPress?: () => void;
}>;

export function MarkerView({
  children,
  style,
  point,
  onPress
}: MarkerViewProps) {
  return (
    <MapboxGL.MarkerView coordinate={point.coordinates}>
      <Pressable style={[styles.markerContainer, style]} onPress={onPress}>
        <ThemedView style={styles.marker}>{children}</ThemedView>
      </Pressable>
    </MapboxGL.MarkerView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    backgroundColor: tamuColors.transparent,
    padding: 10
  }
});
