import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MapView } from '@/components/map/MapView';
import { Layout } from '@/constants/styles/Layout';
import { useCodesignData } from '@/components/CodesignDataProvider';

export default function HomeScreen() {
  const { reports } = useCodesignData();

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
