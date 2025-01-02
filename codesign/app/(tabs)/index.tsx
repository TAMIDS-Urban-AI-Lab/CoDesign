import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setTelemetryEnabled(false);

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={[-122.4194, 37.7749]} // San Francisco coordinates
        />
        <MapboxGL.MarkerView
          id="marker"
          coordinate={[-122.4194, 37.7749]}
        ></MapboxGL.MarkerView>
      </MapboxGL.MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
