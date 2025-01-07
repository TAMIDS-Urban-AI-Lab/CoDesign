import { type ViewProps } from 'react-native';
import MapboxGL, { Camera, StyleURL } from '@rnmapbox/maps';

import { useColorScheme } from '@/hooks/useColorScheme';

type LocalMapViewProps = {
  style?: ViewProps['style'];
  children?: React.ReactNode;
  centerCoords?: number[];
};

const CENTER_COORDS = [-96.3446075505438, 30.613381329387035]; // Centered on Albritton Bell Tower

export function MapView({
  style,
  children,
  centerCoords = CENTER_COORDS
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
