import { type ViewProps, Pressable, StyleSheet } from 'react-native';
import { MarkerView as MapboxMarkerView } from '@rnmapbox/maps';
import { PropsWithChildren } from 'react';

import { ThemedView } from '@/components/ui/ThemedView';
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
    <MapboxMarkerView coordinate={coordinates}>
      <Pressable
        style={[styles.markerContainer, style]}
        onPress={onPress}
        testID="marker-view-pressable"
      >
        <ThemedView style={styles.marker}>{children}</ThemedView>
      </Pressable>
    </MapboxMarkerView>
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
