import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion
} from 'react-native-reanimated';

import { Report, ImageDetails } from '@/types/Report';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedScrollView } from '../ThemedScrollView';

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
          />
        </Animated.View>

        <ThemedView style={styles.contentContainer}>
          <Animated.View style={[styles.header, { height }]}>
            <Animated.Image
              source={getImageSrc(report.getImages())}
              style={[styles.headerImage, { height }]}
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
    <ThemedView style={styles.content}>
      <ThemedView style={styles.contentSection}>
        <ThemedText type="title2" style={[styles.titleText]}>
          {report.getTitle()}
        </ThemedText>
        <ThemedText type="feedback">
          {format(report.getCreatedAt(), 'MMMM dd, yyyy')}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentSection}>
        <ThemedText type="title3">Details</ThemedText>
        <ThemedText style={styles.description}>
          {report.getDescription()}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const getImageSrc = (images: ImageDetails[]) => {
  if (!images || images.length === 0) return DEFAULT_IMAGE_SRC;

  if (typeof images[0].uri === 'string') {
    return { uri: images[0].uri };
  } else {
    return images[0].uri;
  }
};

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
