import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MapView } from '@/components/map/MapView';
import { Layout } from '@/constants/styles/Layout';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <MapView style={[Layout.flex]} />
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
