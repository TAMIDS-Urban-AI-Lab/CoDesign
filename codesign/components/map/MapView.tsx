import { type ViewProps } from 'react-native';
import MapboxGL, { StyleURL } from '@rnmapbox/maps';
import { forwardRef } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

type LocalMapViewProps = {
  style?: ViewProps['style'];
  children?: React.ReactNode;
};

function MapView(
  { style, children }: LocalMapViewProps,
  ref: React.ForwardedRef<MapboxGL.MapView>
) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const styleURL = colorScheme === 'light' ? StyleURL.Light : StyleURL.Dark;
  // need to set this, otherwise mapLoad will fail
  MapboxGL.setAccessToken("pk.eyJ1IjoicGFybmRlcHUiLCJhIjoiY20xam8yYzZpMDNxOTJscHlncHI3OXZmZCJ9.LItUIAG1L1DrNugKyb4V4g");

  return (
    <MapboxGL.MapView
      style={[style]}
      styleURL={styleURL}
      logoEnabled={false}
      ref={ref}
    >
      {children}
    </MapboxGL.MapView>
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
