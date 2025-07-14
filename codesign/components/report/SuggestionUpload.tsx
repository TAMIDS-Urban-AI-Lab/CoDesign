import { ViewProps, StyleSheet, Image } from 'react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { TextButton } from '@/components/ui/TextButton';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { Border } from '@/constants/styles/Border';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useModal } from '@/components/provider/ModalProvider';
import { ThemedModal } from '@/components/ui/ThemedModal';
import { AugmentedRealityProvider } from '@/components/augmented-reality/AugmentedRealityProvider';
import { AugmentedRealityScene } from '@/components/augmented-reality/AugmentedRealityScene';
import { AugmentedRealityUI } from '@/components/augmented-reality/AugmentedRealityUI';
import { ImageDetails } from '@/types/Report';

const SPARKLES_SRC = {
  light: require('@/assets/images/sparkles/sparkles-light.png'),
  dark: require('@/assets/images/sparkles/sparkles-dark.png')
};

type SuggestionUploadProps = {
  style?: ViewProps['style'];
  onChange: (...event: any[]) => void;
  value: ImageDetails[];
};

export function SuggestionUpload({
  style,
  onChange: saveSuggestionToForm,
  value: suggestion
}: SuggestionUploadProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
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
        <TextButton type="secondary" text="SUGGEST" onPress={openARModal} />
      </ThemedView>

      <ThemedModal
        animationType="slide"
        visible={isVisible}
        testID="ar-suggestion-modal"
      >
        <ThemedView style={styles.modalContainer}>
          <AugmentedRealityProvider>
            <AugmentedRealityUI
              handleBackButton={handleBackButton}
              handleSaveSuggestion={(suggestion) => {
                saveSuggestionToForm([suggestion]);
                closeARModal();
              }}
            />
            <AugmentedRealityScene />
          </AugmentedRealityProvider>
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
  }
});
