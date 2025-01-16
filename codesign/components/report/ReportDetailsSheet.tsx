import { useRef, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
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
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { ImageButton } from '@/components/ui/ImageButton';

const HALF_SCREEN = '40%';
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
        break;
      case HALF_SCREEN:
      default:
        height.value = withTiming(HALF_HEADER_HEIGHT, TIMING_PARAMS);
        break;
    }
  };

  const isFullScreen = currentSnapPoint === FULL_SCREEN;

  const images = report.getImages();
  const defaultImage = require('@/assets/images/react-logo.png');
  const previewImageURI = images?.length ? images[0].uri : defaultImage;

  const dateString = format(report.getCreatedAt(), 'MMMM dd, yyyy');

  return (
    <BottomSheet
      index={1}
      snapPoints={SNAP_POINTS}
      ref={bottomSheetRef}
      style={{ backgroundColor, ...Border.elevated, ...Border.roundedTopLarge }}
      handleStyle={styles.handleContainer}
      onChange={handleSheetChange}
      onClose={afterCloseCallback}
    >
      <BottomSheetView
        style={{
          backgroundColor,
          ...Layout.flex,
          ...Border.roundedTopLarge,
          overflow: 'hidden'
        }}
      >
        {!isFullScreen && (
          <ImageButton
            source={CLOSE_SHEET_SRC}
            size={24}
            transparent={true}
            style={styles.closeSheetButton}
            onPress={closeSheet}
          />
        )}

        <ThemedView style={styles.contentContainer}>
          <Animated.View style={[styles.header, { height }]}>
            <Image source={previewImageURI} />
          </Animated.View>
          <ThemedView style={styles.content}>
            <ThemedText type="title2" style={[styles.titleText]}>
              {report.getTitle()}
            </ThemedText>
            <ThemedText type="feedback">{dateString}</ThemedText>
            <ThemedText>{report.getDescription()}</ThemedText>
          </ThemedView>
        </ThemedView>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  closeSheetButton: {
    position: 'absolute',
    top: Spacing.xsmall,
    right: Spacing.xsmall,
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
    ...Border.roundedTopLarge,
    overflow: 'hidden'
  },
  header: {
    ...Border.roundedTopLarge,
    backgroundColor: tamuColors.primaryBrandLight,
    overflow: 'hidden'
  },
  content: {
    ...Layout.flex,
    padding: Spacing.large
  },
  titleText: {
    lineHeight: 40
  }
});
