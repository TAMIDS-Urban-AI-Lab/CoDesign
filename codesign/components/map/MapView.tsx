import { type ViewProps } from 'react-native';
import { MapView as MapboxMapView, StyleURL } from '@rnmapbox/maps';
import { forwardRef } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

type LocalMapViewProps = {
  style?: ViewProps['style'];
  children?: React.ReactNode;
};

function MapView(
  { style, children }: LocalMapViewProps,
  ref: React.ForwardedRef<MapboxMapView>
) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const styleURL = colorScheme === 'light' ? StyleURL.Light : StyleURL.Dark;

  return (
    <MapboxMapView
      style={[style]}
      styleURL={styleURL}
      logoEnabled={false}
      ref={ref}
      testID="mapbox-mapview"
    >
      {children}
    </MapboxMapView>
  );
}

/**
 * This allows the MapView obj to be accessed in the parent component
 * so we can call methods on it.
 *
 * Example:
 * const mapRef = useRef<MapboxGL.MapView>(null);
 * mapRef.current?.getCenter();
 */

const forwardedRef = forwardRef(MapView);

export { forwardedRef as MapView };
