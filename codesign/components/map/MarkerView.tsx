import { type ViewProps, Pressable, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { PropsWithChildren } from 'react';

import { ThemedView } from '@/components/ThemedView';
import { tamuColors } from '@/constants/Colors';

type MarkerViewProps = PropsWithChildren<{
  style?: ViewProps['style'];
  coordinates: number[];
  onPress?: () => void;
}>;

export function MarkerView({
  children,
  style,
  coordinates,
  onPress
}: MarkerViewProps) {
  return (
    <MapboxGL.MarkerView coordinate={coordinates}>
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
