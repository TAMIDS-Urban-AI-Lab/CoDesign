import { ViewProps, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { TextButton } from '@/components/ui/TextButton';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { Border } from '@/constants/styles/Border';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useModal } from '@/components/provider/ModalProvider';
import { ThemedModal } from '@/components/ui/ThemedModal';
import { ImageButton } from '@/components/ui/ImageButton';
import { CHEVRON_LEFT_SRC } from '@/constants/ImagePaths';
import { AugmentedRealityScene } from '@/components/augmented-reality/augmented-reality';

const SPARKLES_SRC = {
  light: require('@/assets/images/sparkles/sparkles-light.png'),
  dark: require('@/assets/images/sparkles/sparkles-dark.png')
};

type SuggestionUploadProps = {
  style?: ViewProps['style'];
  onChange: (...event: any[]) => void;
  value: string;
};

export function SuggestionUpload({
  style,
  onChange,
  value: suggestion
}: SuggestionUploadProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const nudgeBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );
  const [nudgeText, setNudgeText] = useState('');
  const {
    isVisible,
    openModal: openARModal,
    closeModal: closeARModal
  } = useModal('augmentedReality');

  const handleBackButton = () => {
    closeARModal();
  };

  return (
    <ThemedView style={style}>
      <ThemedView style={styles.container}>
        <Image
          source={SPARKLES_SRC[colorScheme]}
          style={styles.sparklesImage}
          testID="suggestion-sparkles-image"
        />
        <ThemedText style={styles.message}>
          Would you like to suggest an improvement?
        </ThemedText>
        <TextButton
          type="secondary"
          text="SUGGEST"
          onPress={() => openARModal()}
        />
      </ThemedView>

      <ThemedModal
        animationType="slide"
        visible={isVisible}
        testID="ar-suggestion-modal"
      >
        <ThemedView style={styles.modalContainer}>
          <ImageButton
            source={CHEVRON_LEFT_SRC[colorScheme]}
            size={24}
            onPress={handleBackButton}
            elevated={true}
            style={styles.backButton}
            testID="close-ar-modal-button"
          />
          <ThemedView style={[styles.modalContentContainer]}>
            <AugmentedRealityScene
              updateNudgeText={(text) => {
                setNudgeText(text);
              }}
            />
          </ThemedView>
          <ThemedView style={styles.nudgeTextContainer}>
            <ThemedText
              style={[styles.nudgeText, { backgroundColor: nudgeBackground }]}
            >
              {nudgeText}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedModal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Layout.row,
    ...Layout.justifySpaceBetween,
    ...Layout.alignCenter,
    gap: Spacing.medium,
    borderWidth: 1.5,
    borderColor: tamuColors.gray300,
    ...Border.roundedSmall,
    borderStyle: 'dotted',
    padding: Spacing.small
  },
  sparklesImage: {
    width: 24,
    height: 24
  },
  message: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'OpenSansSemiBold'
  },
  modalContainer: {
    ...Layout.flex
  },
  modalContentContainer: {
    ...Layout.flex
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xxxlarge,
    left: Spacing.large,
    zIndex: 1
  },
  nudgeTextContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: Spacing.xxxlarge,
    left: 0,
    right: 0,
    backgroundColor: tamuColors.transparent
  },
  nudgeText: {
    textAlign: 'center',
    padding: Spacing.small,
    ...Border.roundedSmall
  }
});
