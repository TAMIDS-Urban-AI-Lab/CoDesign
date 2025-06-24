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
import { useAugmentedRealityContext } from '@/components/provider/AugmentedRealityProvider';

type AugmentedRealityUIOverlayProps = {
  handleBackButton: () => void;
  nudgeText: string;
  colorScheme: 'light' | 'dark';
};

export function AugmentedRealityUIOverlay({
  handleBackButton,
  nudgeText,
  colorScheme
}: AugmentedRealityUIOverlayProps) {
  const nudgeBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );

  const { eventCallbacks } = useAugmentedRealityContext();

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
      {eventCallbacks.handleMoveScene && (
        <TextButton
          type="secondary"
          text="Move Here"
          onPress={eventCallbacks.handleMoveScene}
          style={styles.clearButton}
        />
      )}
      {eventCallbacks.handleAddObject && (
        <TextButton
          type="secondary"
          text="+ Add Object"
          onPress={eventCallbacks.handleAddObject}
          style={styles.addButton}
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
  addButton: {
    position: 'absolute',
    top: Spacing.xxxlarge,
    right: Spacing.large * 6,
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
