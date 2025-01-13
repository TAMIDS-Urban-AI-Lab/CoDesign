import { type ViewProps } from 'react-native';
import MapboxGL, { StyleURL } from '@rnmapbox/maps';

import { useColorScheme } from '@/hooks/useColorScheme';

type LocalMapViewProps = {
  style?: ViewProps['style'];
  children?: React.ReactNode;
};

export function MapView({ style, children }: LocalMapViewProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const styleURL = colorScheme === 'light' ? StyleURL.Light : StyleURL.Dark;

  return (
    <MapboxGL.MapView style={[style]} styleURL={styleURL} logoEnabled={false}>
      {children}
    </MapboxGL.MapView>
  );
}
