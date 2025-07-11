import { StyleSheet } from 'react-native';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';

import { ThemedView } from '@/components/ui/ThemedView';
import { ImageButton } from '@/components/ui/ImageButton';
import { useAugmentedRealityContext } from '@/components/augmented-reality/AugmentedRealityProvider';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { CAPTURE_BUTTON_SRC } from '@/constants/ImagePaths';

const SCREENSHOT_WAIT_TIME = 25;
const CAPTURE_BUTTON_SIZE = 75;

type ScreenshotCaptureProps = {
  handleSaveSuggestion: () => void;
  setShowEntireUI: (show: boolean) => void;
};

export function ScreenshotCapture({
  handleSaveSuggestion,
  setShowEntireUI
}: ScreenshotCaptureProps) {
  const [libraryStatus, requestLibraryPermission] = usePermissions();

  const {
    setNudgeTextWithReset,
    augmentedRealitySceneRef,
    maybeHideNudgeText
  } = useAugmentedRealityContext();

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

    maybeHideNudgeText();
    setShowEntireUI(false);
    setTimeout(() => {
      takeScreenshot();
    }, SCREENSHOT_WAIT_TIME);
  };

  const takeScreenshot = async () => {
    return await augmentedRealitySceneRef?.current?.capture?.().then((uri) => {
      saveToLibraryAsync(uri)
        .then(() => {
          setNudgeTextWithReset('Screenshot saved');
          setShowEntireUI(true);
          handleSaveSuggestion();
        })
        .catch(() => {
          setNudgeTextWithReset(
            'An issue occurred while saving the screenshot.'
          );
          setShowEntireUI(true);
        })
        .catch(() => {
          setNudgeTextWithReset(
            'An issue occurred while taking the screenshot.'
          );
          setShowEntireUI(true);
        });
    });
  };

  return (
    <>
      <ThemedView style={[styles.screenCaptureContainer]}>
        <ThemedView style={[styles.screenCaptureRow]}>
          <ImageButton
            source={CAPTURE_BUTTON_SRC}
            size={CAPTURE_BUTTON_SIZE}
            spacing={0}
            transparent={true}
            onPress={handleScreenshot}
            testID="screenshot-button"
            accessibilityLabel="Take Screenshot"
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  screenCaptureContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: Spacing.xxxlarge * 3.75,
    backgroundColor: '#57575799'
  },
  screenCaptureRow: {
    padding: Spacing.xsmall,
    width: '100%',
    height: 100,
    backgroundColor: '#00000033',
    ...Layout.row,
    ...Layout.center
  }
});
