import { ViewProps, StyleSheet, Image } from 'react-native';
import { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';
import ViewShot from 'react-native-view-shot';

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
import { ImageButton } from '@/components/ui/ImageButton';
import { CHEVRON_LEFT_SRC } from '@/constants/ImagePaths';
import { useThemeColor } from '@/hooks/useThemeColor';

const NUDGE_TEXT_TIMEOUT = 5000;

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
  const {
    isVisible,
    openModal: openARModal,
    closeModal: closeARModal
  } = useModal('augmentedReality');
  const [libraryStatus, requestLibraryPermission] = usePermissions();
  const [nudgeText, setNudgeText] = useState('');
  const nudgeBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );
  const augmentedRealitySceneRef = useRef<ViewShot>(null);

  const handleBackButton = () => {
    closeARModal();
  };

  const handleScreenshot = async () => {
    if (!libraryStatus?.granted) {
      const { status } = await requestLibraryPermission();
      if (status && status !== 'granted') {
        setNudgeText(
          'Camera permission is required to take a photo. Please enable access in device settings.'
        );
        resetNudgeText(NUDGE_TEXT_TIMEOUT);
        return;
      }
    }

    await augmentedRealitySceneRef?.current?.capture?.().then((uri) => {
      saveToLibraryAsync(uri)
        .then(() => {
          setNudgeText('Screenshot saved');
          resetNudgeText(NUDGE_TEXT_TIMEOUT);
        })
        .catch(() => {
          setNudgeText('An issue occurred while saving the screenshot.');
          resetNudgeText(NUDGE_TEXT_TIMEOUT);
        })
        .catch(() => {
          setNudgeText('An issue occurred while taking the screenshot.');
          resetNudgeText(NUDGE_TEXT_TIMEOUT);
        });
    });
  };

  const resetNudgeText = (waitTime: number) => {
    setTimeout(() => {
      setNudgeText('');
    }, waitTime);
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
          <ImageButton
            source={CHEVRON_LEFT_SRC[colorScheme]}
            size={24}
            onPress={handleBackButton}
            elevated={true}
            style={styles.backButton}
            testID="close-ar-modal-button"
          />
          <TextButton
            type="secondary"
            text="Take Screenshot"
            onPress={handleScreenshot}
            style={styles.screenshotButton}
            testID="take-screenshot-button"
          />
          {nudgeText && (
            <ThemedView style={styles.nudgeTextContainer}>
              <ThemedText
                style={[styles.nudgeText, { backgroundColor: nudgeBackground }]}
              >
                {nudgeText}
              </ThemedText>
            </ThemedView>
          )}
          <ViewShot
            style={[styles.modalContentContainer]}
            ref={augmentedRealitySceneRef}
          >
            <WebView
              source={{ uri: 'https://tamucodesign.8thwall.app/tap-menu/' }}
              allowsInlineMediaPlayback={true}
            />
          </ViewShot>
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
    ...Layout.flex,
    paddingVertical: Spacing.xxxlarge,
    paddingHorizontal: Spacing.large
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
  screenshotButton: {
    position: 'absolute',
    bottom: Spacing.xxxlarge,
    right: Spacing.large,
    zIndex: 1
  },
  nudgeTextContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: Spacing.xxxlarge * 3.5,
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
