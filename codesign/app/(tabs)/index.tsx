import { StyleSheet, Image } from 'react-native';

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
        {!isReportsEmpty &&
          reports.map((report) => (
            <MarkerView
              key={report.getId()}
              coordinates={report.getCoordinates()}
              onPress={() => alertLocation(report.getTitle())}
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
  },
  successBadge: {
    width: 50,
    height: 50,
    marginBottom: Spacing.medium
  }
});
