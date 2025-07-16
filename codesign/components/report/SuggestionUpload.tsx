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
import { ARProvider } from '@/components/augmented-reality/ARProvider';
import { ARScene } from '@/components/augmented-reality/ARScene';
import { ARUserInterface } from '@/components/augmented-reality/ARUserInterface';
import { ImageDetails } from '@/types/Report';
import { ImageButton } from '@/components/ui/ImageButton';
import { CLOSE_IMAGE_SRC } from '@/constants/ImagePaths';

const SPARKLES_SRC = {
  light: require('@/assets/images/sparkles/sparkles-light.png'),
  dark: require('@/assets/images/sparkles/sparkles-dark.png')
};

const SUGGESTION_IMAGE_HEIGHT = 90;

type SuggestionUploadProps = {
  style?: ViewProps['style'];
  onChange: (...event: any[]) => void;
  value: ImageDetails[];
};

export function SuggestionUpload({
  style,
  onChange: saveSuggestionToForm,
  value: suggestions
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

  const noSuggestions = !suggestions || suggestions.length === 0;
  const hasSuggestions = suggestions && suggestions.length > 0;

  return (
    <ThemedView style={style}>
      <ThemedView style={styles.container}>
        <Image
          source={SPARKLES_SRC[colorScheme]}
          style={styles.sparklesImage}
          testID="suggestion-sparkles-image"
        />
        {hasSuggestions && (
          <>
            <ThemedText style={styles.message}>Suggestion Added</ThemedText>
            <ThemedView style={styles.imageContainer}>
              <ImageButton
                source={CLOSE_IMAGE_SRC[colorScheme]}
                size={24}
                transparent={true}
                style={styles.removeImageButton}
                onPress={() => saveSuggestionToForm([])}
                accessibilityLabel={`Remove suggestion`}
                testID="remove-suggestion-button"
              />
              <Image
                source={{ uri: suggestions[0].uri }}
                style={styles.image}
                accessibilityLabel={'Uploaded suggestion'}
                testID={`uploaded-suggestion`}
              />
            </ThemedView>
          </>
        )}
        {noSuggestions && (
          <>
            <ThemedText style={styles.message}>
              Suggest an improvement with Augmented Reality
            </ThemedText>
            <TextButton type="secondary" text="SUGGEST" onPress={openARModal} />
          </>
        )}
      </ThemedView>

      <ThemedModal
        animationType="slide"
        visible={isVisible}
        testID="ar-suggestion-modal"
      >
        <ThemedView style={styles.modalContainer}>
          <ARProvider>
            <ARUserInterface
              suggestions={suggestions}
              handleBackButton={handleBackButton}
              handleSaveSuggestions={(suggestions: ImageDetails[]) => {
                saveSuggestionToForm(suggestions);
              }}
              closeARModal={closeARModal}
            />
            <ARScene />
          </ARProvider>
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
  imageContainer: {
    ...Layout.flex,
    ...Layout.absolute,
    ...Border.elevatedSmall,
    ...Border.roundedSmall,
    width: 'auto',
    height: SUGGESTION_IMAGE_HEIGHT
  },
  image: {
    width: '100%',
    height: '100%',
    ...Border.roundedSmall
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  }
});
