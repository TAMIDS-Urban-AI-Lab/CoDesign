import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion
} from 'react-native-reanimated';

import { Report } from '@/types/Report';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedScrollView } from '@/components/ui/ThemedScrollView';
import { getImageSrc } from '@/utils/Image';

const HALF_SCREEN = '30%';
const FULL_SCREEN = '100%';
type SnapPointType = typeof HALF_SCREEN | typeof FULL_SCREEN;
const SNAP_POINTS: SnapPointType[] = [HALF_SCREEN, FULL_SCREEN];

const HALF_HEADER_HEIGHT = 120;
const FULL_HEADER_HEIGHT = 360;

const TIMING_PARAMS = {
  duration: 750,
  easing: Easing.inOut(Easing.back(3)),
  reduceMotion: ReduceMotion.System
};

const CLOSE_SHEET_SRC = require('@/assets/images/circle-xmark.png');
const DEFAULT_IMAGE_SRC = require('@/assets/images/react-logo.png');

type ReportDetailsSheetProps = {
  report: Report | null;
  afterCloseCallback: () => void;
};

export function ReportDetailsSheet({
  report,
  afterCloseCallback
}: ReportDetailsSheetProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [currentSnapPoint, setCurrentSnapPoint] =
    useState<SnapPointType | null>(null);

  const height = useSharedValue(HALF_HEADER_HEIGHT);
  const [closeButtonTop, closeButtonRight] = [
    useSharedValue(Spacing.xsmall),
    useSharedValue(Spacing.xsmall)
  ];

  if (!report) return null;

  const closeSheet = () => {
    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const handleSheetChange = (index: number) => {
    const snapPointIdx = index ? index - 1 : 0;
    const snapPoint = SNAP_POINTS[snapPointIdx];
    setCurrentSnapPoint(snapPoint);

    switch (snapPoint) {
      case FULL_SCREEN:
        height.value = withTiming(FULL_HEADER_HEIGHT, TIMING_PARAMS);
        closeButtonTop.value = withTiming(Spacing.xxlarge, TIMING_PARAMS);
        closeButtonRight.value = withTiming(Spacing.small, TIMING_PARAMS);
        break;
      case HALF_SCREEN:
      default:
        height.value = withTiming(HALF_HEADER_HEIGHT, TIMING_PARAMS);
        closeButtonTop.value = withTiming(Spacing.xsmall, TIMING_PARAMS);
        closeButtonRight.value = withTiming(Spacing.xsmall, TIMING_PARAMS);
        break;
    }
  };

  const isFullScreen = currentSnapPoint === FULL_SCREEN;

  return (
    <BottomSheet
      index={1}
      snapPoints={SNAP_POINTS}
      ref={bottomSheetRef}
      style={{ backgroundColor, ...Border.elevated, ...Border.roundedTopSmall }}
      handleStyle={styles.handleContainer}
      onChange={handleSheetChange}
      onClose={afterCloseCallback}
      accessibilityLabel={'Report details sheet'}
      accessible={Platform.select({
        /**
         * Accessible = false so e2e tests (Maestro) can read the contents of the sheet
         *
         * setting it to false on iOS allows Voicover to read the contents of the sheet
         * do not set to false on Android, it will cause issues with TalkBack
         * Reference: https://github.com/mobile-dev-inc/Maestro/issues/1493#issuecomment-2146007118
         * */
        ios: false
      })}
    >
      <BottomSheetView
        style={{
          backgroundColor,
          ...Layout.flex,
          ...Border.roundedTopSmall,
          overflow: 'hidden'
        }}
      >
        <Animated.View
          style={[
            styles.closeButtonContainer,
            { top: closeButtonTop, right: closeButtonRight }
          ]}
        >
          <ImageButton
            source={CLOSE_SHEET_SRC}
            size={24}
            transparent={true}
            onPress={closeSheet}
            accessibilityLabel="Close report details sheet"
            testID="report-details-sheet-close-button"
          />
        </Animated.View>

        <ThemedView style={styles.contentContainer}>
          <Animated.View style={[styles.header, { height }]}>
            {/* TO DO: Add image loading and error states */}
            <Animated.Image
              source={getImageSrc(DEFAULT_IMAGE_SRC, report.getImages())}
              style={[styles.headerImage, { height }]}
              testID={'report-details-sheet-header-image'}
              accessibilityLabel={'Report details header image'}
            />
          </Animated.View>
          {isFullScreen ? (
            <ThemedScrollView>
              <ReportDetails report={report} />
            </ThemedScrollView>
          ) : (
            <ThemedView style={Layout.flex}>
              <ReportDetails report={report} />
            </ThemedView>
          )}
        </ThemedView>
      </BottomSheetView>
    </BottomSheet>
  );
}

function ReportDetails({ report }: { report: Report }) {
  return (
    <ThemedView style={styles.content} testID="report-details-sheet-content">
      <ThemedView style={styles.contentSection}>
        <ThemedText
          type="title2"
          style={[styles.titleText]}
          testID="report-details-sheet-title"
        >
          {report.getTitle()}
        </ThemedText>
        <ThemedText type="feedback" testID="report-details-sheet-date">
          {format(report.getCreatedAt(), 'MMMM dd, yyyy')}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentSection}>
        <ThemedText type="title3">Details</ThemedText>
        <ThemedText
          style={styles.description}
          testID="report-details-sheet-description"
        >
          {report.getDescription()}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: 'absolute',
    zIndex: 1
  },
  handleContainer: {
    backgroundColor: tamuColors.transparent,
    position: 'absolute',
    width: '100%'
  },
  contentContainer: {
    ...Layout.flex,
    ...Border.elevated,
    ...Border.roundedTopSmall,
    overflow: 'hidden'
  },
  header: {
    ...Border.roundedTopSmall,
    backgroundColor: tamuColors.gray500,
    overflow: 'hidden'
  },
  headerImage: {
    width: '100%',
    resizeMode: 'cover'
  },
  content: {
    ...Layout.flex,
    padding: Spacing.large,
    gap: Spacing.large
  },
  contentSection: {
    gap: Spacing.small
  },
  titleText: {
    lineHeight: 40
  },
  description: {
    textOverflow: 'ellipsis'
  }
});
