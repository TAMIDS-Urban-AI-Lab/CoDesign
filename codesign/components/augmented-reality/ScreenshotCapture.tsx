import { StyleSheet } from 'react-native';
import {
  usePermissions,
  createAssetAsync,
  type Asset
} from 'expo-media-library';

import { ThemedView } from '@/components/ui/ThemedView';
import { ImageButton } from '@/components/ui/ImageButton';
import { useARContext } from '@/components/augmented-reality/ARProvider';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { CAPTURE_BUTTON_SRC } from '@/constants/ImagePaths';
import { convertImageToBase64 } from '@/utils/Image';
import { ImageDetails } from '@/types/Report';

const SCREENSHOT_WAIT_TIME = 5;
const CAPTURE_BUTTON_SIZE = 75;

type ScreenshotCaptureProps = {
  handleSaveSuggestions: (suggestion: ImageDetails[]) => void;
  setShowEntireUI: (show: boolean) => void;
  afterScreenshotCallback?: () => void;
};

export function ScreenshotCapture({
  handleSaveSuggestions,
  setShowEntireUI,
  afterScreenshotCallback
}: ScreenshotCaptureProps) {
  const [libraryStatus, requestLibraryPermission] = usePermissions();

  const { setNudgeTextWithReset, ARSceneRef, maybeHideNudgeText } =
    useARContext();

  const handleScreenshot = async () => {
    if (!libraryStatus?.granted) {
      const { status } = await requestLibraryPermission();
      if (status && status !== 'granted') {
        setNudgeTextWithReset(
          'Library access is required to save the photo. Please enable access in device settings.'
        );
        return;
      }
    }

    maybeHideNudgeText();
    setShowEntireUI(false);
    setTimeout(() => {
      takeScreenshot(afterScreenshotCallback);
    }, SCREENSHOT_WAIT_TIME);
  };

  const takeScreenshot = async () => {
    return await ARSceneRef?.current?.capture?.().then((uri) => {
      createAssetAsync(uri)
        .then((asset: Asset) => {
          convertImageToBase64(uri)
            .then((base64) => {
              const screenshotImage: ImageDetails = {
                uri: asset.uri,
                base64: base64
              };
              // Save to form
              handleSaveSuggestions([screenshotImage]);
              afterScreenshotCallback?.();
              setShowEntireUI(true);
            })
            .catch(() => {
              setNudgeTextWithReset(
                'An issue occurred while adding the suggestion to the report'
              );
              setShowEntireUI(true);
            });
        })
        .catch(() => {
          setNudgeTextWithReset(
            'An issue occurred while saving the screenshot to library'
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
