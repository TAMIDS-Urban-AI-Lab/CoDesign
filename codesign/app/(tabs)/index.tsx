import { StyleSheet, Image } from 'react-native';
import { Camera } from '@rnmapbox/maps';

import { ThemedView } from '@/components/ThemedView';
import { MapView } from '@/components/map/MapView';
import { Layout } from '@/constants/styles/Layout';
import { useCodesignData } from '@/components/provider/CodesignDataProvider';
import { MarkerView } from '@/components/map/MarkerView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FloatingModal } from '@/components/ui/FloatingModal';
import { useModal } from '@/components/provider/ModalProvider';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/styles/Spacing';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

const REPORT_ICON_SRC = {
  light: require('@/assets/images/custom-form-icon-light.png'),
  dark: require('@/assets/images/custom-form-icon-dark.png')
};

const SUCCESS_BADGE_SRC = {
  light: require('@/assets/images/badge-check-light.png'),
  dark: require('@/assets/images/badge-check-dark.png')
};

export default function HomeScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const { reports } = useCodesignData();
  const isReportsEmpty = reports.length === 0;

  const { isVisible, closeModal } = useModal('success');
  return (
    <ThemedView style={styles.titleContainer}>
      <FloatingModal closeModal={closeModal} visible={isVisible}>
        <Image
          style={styles.successBadge}
          source={SUCCESS_BADGE_SRC[colorScheme]}
        />
        <ThemedText>Report Submitted</ThemedText>
      </FloatingModal>
      <MapView style={[Layout.flex]}>
        <Camera zoomLevel={14} centerCoordinate={ALBRITTON_BELL_TOWER} />
        {!isReportsEmpty &&
          reports.map((report) => (
            <MarkerView
              key={report.id}
              coordinates={report.coordinates}
              onPress={() => alertLocation(report)}
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

function alertLocation(report: Report) {
  // TODO: remove alert
  // Add popup box with image thumbnail
  alert(`
    Title: ${report.title}
    Type: ${report.reportType}
    Desc: ${report.description}
  `);
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
  },
  successBadge: {
    width: 50,
    height: 50,
    marginBottom: Spacing.medium
  }
});
