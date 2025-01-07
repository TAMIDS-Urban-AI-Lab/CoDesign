import { type ViewProps } from 'react-native';
import MapboxGL, { Camera, StyleURL } from '@rnmapbox/maps';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

type LocalMapViewProps = {
  style?: ViewProps['style'];
  children?: React.ReactNode;
  centerCoords?: number[];
};

export function MapView({
  style,
  children,
  centerCoords = ALBRITTON_BELL_TOWER
}: LocalMapViewProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const styleURL = colorScheme === 'light' ? StyleURL.Light : StyleURL.Dark;

  return (
    <MapboxGL.MapView style={[style]} styleURL={styleURL}>
      <Camera zoomLevel={14} centerCoordinate={centerCoords} />
      {children}
    </MapboxGL.MapView>
  );
}
