import { type ViewProps } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

type MapViewProps = {
  style?: ViewProps['style'];
};

export function MapView({ style }: MapViewProps) {
  return (
    <MapboxGL.MapView style={[style]}>
      <MapboxGL.Camera
        zoomLevel={12}
        centerCoordinate={[-96.33675171928707, 30.619524612814295]} // Texas A&M coordinates
      />
    </MapboxGL.MapView>
  );
}
