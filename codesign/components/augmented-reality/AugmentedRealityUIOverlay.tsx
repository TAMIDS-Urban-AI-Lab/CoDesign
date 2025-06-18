import { StyleSheet } from 'react-native';

import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { tamuColors } from '@/constants/Colors';
import { Spacing } from '@/constants/styles/Spacing';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { CHEVRON_LEFT_SRC } from '@/constants/ImagePaths';
import { TextButton } from '../ui/TextButton';

type AugmentedRealityUIOverlayProps = {
  handleBackButton: () => void;
  nudgeText: string;
  colorScheme: 'light' | 'dark';
  eventCallbacks: object;
};

export function AugmentedRealityUIOverlay({
  handleBackButton,
  nudgeText,
  colorScheme,
  eventCallbacks
}: AugmentedRealityUIOverlayProps) {
  const nudgeBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );

  const moveHandler = () => {
    const moveHandler = eventCallbacks.handleMoveScene;
    if (typeof moveHandler === 'function') {
      moveHandler();
    }
  };

  return (
    <>
      <ImageButton
        source={CHEVRON_LEFT_SRC[colorScheme]}
        size={24}
        onPress={handleBackButton}
        elevated={true}
        style={styles.backButton}
        testID="close-ar-modal-button"
      />
      {moveHandler && (
        <TextButton
          type="secondary"
          text="Move Here"
          onPress={moveHandler}
          style={styles.clearButton}
        />
      )}
      <ThemedView style={styles.nudgeTextContainer}>
        <ThemedText
          style={[styles.nudgeText, { backgroundColor: nudgeBackground }]}
        >
          {nudgeText}
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Spacing.xxxlarge,
    left: Spacing.large,
    zIndex: 1
  },
  clearButton: {
    position: 'absolute',
    top: Spacing.xxxlarge,
    right: Spacing.large,
    zIndex: 1
  },
  nudgeTextContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: Spacing.xxxlarge,
    left: 0,
    right: 0,
    backgroundColor: tamuColors.transparent,
    zIndex: 1
  },
  nudgeText: {
    textAlign: 'center',
    padding: Spacing.small,
    ...Border.roundedSmall
  }
});
