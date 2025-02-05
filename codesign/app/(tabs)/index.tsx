import { StyleSheet, Image } from 'react-native';
import { Camera } from '@rnmapbox/maps';
import { useState } from 'react';

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
import { Coordinates, Report } from '@/types/Report';
import { ReportDetailsSheet } from '@/components/report/ReportDetailsSheet';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

const REPORT_ICON_SRC = {
  light: require('@/assets/images/custom-form-icon-light.png'),
  dark: require('@/assets/images/custom-form-icon-dark.png')
};

const SUCCESS_BADGE_SRC = {
  light: require('@/assets/images/badge-check-light.png'),
  dark: require('@/assets/images/badge-check-dark.png')
};

const FAR_ZOOM = 14;
const CLOSE_ZOOM = 16;

export default function HomeScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const { reports } = useCodesignData();
  const isReportsEmpty = reports.length === 0;

  const { isVisible, closeModal } = useModal('success');

  const [isSheetExpanded, setSheetExpanded] = useState(false);
  const [displayedReport, setDisplayedReport] = useState<Report | null>(null);
  const [keyNumber, rerenderSheet] = useState(0);

  const mapCenter: Coordinates = displayedReport
    ? offsetReportCenter(displayedReport.getCoordinates())
    : ALBRITTON_BELL_TOWER;

  const zoomLevel = displayedReport ? CLOSE_ZOOM : FAR_ZOOM;

  const expandSheet = (report: Report) => {
    setSheetExpanded(true);

    if (displayedReport?.getId() !== report.getId()) {
      rerenderSheet((prev) => prev + 1);
      setDisplayedReport(report);
    }
  };

  const closeSheet = () => {
    setSheetExpanded(false);
    setDisplayedReport(null);
  };

  return (
    <ThemedView style={Layout.flex}>
      <FloatingModal closeModal={closeModal} visible={isVisible}>
        <Image
          style={styles.successBadge}
          source={SUCCESS_BADGE_SRC[colorScheme]}
        />
        <ThemedText>Report Submitted</ThemedText>
      </FloatingModal>
      <MapView style={[Layout.flex]}>
        <Camera zoomLevel={zoomLevel} centerCoordinate={mapCenter} />
        {!isReportsEmpty &&
          reports.map((report) => (
            <MarkerView
              key={report.getId()}
              coordinates={report.getCoordinates()}
              onPress={() => expandSheet(report)}
            >
              <Image
                source={REPORT_ICON_SRC[colorScheme]}
                style={styles.reportImage}
              />
            </MarkerView>
          ))}
      </MapView>
      {isSheetExpanded && (
        <ReportDetailsSheet
          key={keyNumber}
          report={displayedReport}
          afterCloseCallback={closeSheet}
        />
      )}
    </ThemedView>
  );
}

const offsetReportCenter = (coordinates: Coordinates): Coordinates => {
  return [coordinates[0], coordinates[1] - 0.0008];
};

const styles = StyleSheet.create({
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
