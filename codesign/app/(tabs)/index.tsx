import { StyleSheet, Image } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MapView } from '@/components/map/MapView';
import { Layout } from '@/constants/styles/Layout';
import { useCodesignData } from '@/components/CodesignDataProvider';
import { MarkerView } from '@/components/map/MarkerView';
import { useColorScheme } from '@/hooks/useColorScheme';

export type MapDataPoint = {
  id: string;
  coordinates: number[];
  name: string;
};

const REPORT_COORDS: MapDataPoint[] = [
  {
    id: '1',
    coordinates: [-96.34058678893092, 30.61452419398209],
    name: 'Hart Hall'
  },
  {
    id: '2',
    coordinates: [-96.33890180386302, 30.617351074711575],
    name: 'Sterling C. Evans Library'
  },
  {
    id: '3',
    coordinates: [-96.34415881904341, 30.615708632774894],
    name: 'McFadden Hall'
  },
  {
    id: '4',
    coordinates: [-96.35119602985726, 30.607255922217114],
    name: 'The Gardens at TAMU'
  },
  {
    id: '5',
    coordinates: [-96.34679890280329, 30.60260129978098],
    name: 'Memorial Student Center'
  },
  {
    id: '6',
    coordinates: [-96.3461850646517, 30.611058409443608],
    name: 'Instructional Laboratory & Innovative Learning Building'
  }
];

const REPORT_ICON_SRC = {
  light: require('@/assets/images/custom-form-icon-light.png'),
  dark: require('@/assets/images/custom-form-icon-dark.png')
};

export default function HomeScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const { reports } = useCodesignData();

  return (
    <ThemedView style={styles.titleContainer}>
      <MapView style={[Layout.flex]}>
        {REPORT_COORDS.map((point) => (
          <MarkerView
            key={point.id}
            coordinates={point.coordinates}
            onPress={() => alertLocation(point.name)}
          >
            <Image
              source={REPORT_ICON_SRC[colorScheme]}
              style={styles.reportImage}
            />
          </MarkerView>
        ))}
      </MapView>
    </ThemedView>
  );
}

function alertLocation(name: string) {
  alert(`Marker Pressed for ${name}`);
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  reportImage: {
    width: 25,
    height: 30
  }
});
