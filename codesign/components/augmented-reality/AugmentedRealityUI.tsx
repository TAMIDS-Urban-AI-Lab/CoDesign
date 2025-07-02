import { StyleSheet } from 'react-native';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';

import { ImageButton } from '@/components/ui/ImageButton';
import { TextButton } from '@/components/ui/TextButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CHEVRON_LEFT_SRC } from '@/constants/ImagePaths';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { tamuColors } from '@/constants/Colors';
import { Border } from '@/constants/styles/Border';
import { useAugmentedRealityContext } from '@/components/augmented-reality/AugmentedRealityProvider';

const SCREENSHOT_WAIT_TIME = 25; // milliseconds

export function AugmentedRealityUI({
  handleBackButton,
  handleSaveSuggestion
}: {
  handleBackButton: () => void;
  handleSaveSuggestion: () => void;
}) {
  const {
    nudgeText,
    setNudgeTextWithReset,
    augmentedRealitySceneRef,
    webViewRef
  } = useAugmentedRealityContext();

  const [libraryStatus, requestLibraryPermission] = usePermissions();
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const nudgeBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );

  const setMenuDisplay = (display: 'none' | 'flex') => {
    return `
      document.getElementById('container').style.display = '${display}';
      true;
      `;
  };

  const hideItemMenu = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(setMenuDisplay('none'));
    }
  };

  const showItemMenu = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(setMenuDisplay('flex'));
    }
  };

  const handleScreenshot = async () => {
    if (!libraryStatus?.granted) {
      const { status } = await requestLibraryPermission();
      if (status && status !== 'granted') {
        setNudgeTextWithReset(
          'Camera permission is required to take a photo. Please enable access in device settings.'
        );
        return;
      }
    }

    setNudgeTextWithReset('');
    hideItemMenu();
    setTimeout(() => {
      takeScreenshot();
    }, SCREENSHOT_WAIT_TIME);
  };

  const takeScreenshot = async () => {
    return await augmentedRealitySceneRef?.current?.capture?.().then((uri) => {
      saveToLibraryAsync(uri)
        .then(() => {
          setNudgeTextWithReset('Screenshot saved');
          showItemMenu();
          handleSaveSuggestion();
        })
        .catch(() => {
          setNudgeTextWithReset(
            'An issue occurred while saving the screenshot.'
          );
          showItemMenu();
        })
        .catch(() => {
          setNudgeTextWithReset(
            'An issue occurred while taking the screenshot.'
          );
          showItemMenu();
        });
    });
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
    bottom: Spacing.xxxlarge * 4,
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
