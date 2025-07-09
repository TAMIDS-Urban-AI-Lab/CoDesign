import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { saveToLibraryAsync, usePermissions } from 'expo-media-library';

import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CHEVRON_LEFT_SRC, CAMERA_SRC, ADD_SRC } from '@/constants/ImagePaths';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { tamuColors } from '@/constants/Colors';
import { Border } from '@/constants/styles/Border';
import { useAugmentedRealityContext } from '@/components/augmented-reality/AugmentedRealityProvider';
import { TextButton } from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';

const SCREENSHOT_WAIT_TIME = 25; // milliseconds

type AR_UI_TAB = 'INITIAL' | 'ITEM_MENU' | 'SCREEN_CAPTURE';

const AR_UI_TABS: Record<string, AR_UI_TAB> = {
  INITIAL: 'INITIAL',
  ITEM_MENU: 'ITEM_MENU',
  SCREEN_CAPTURE: 'SCREEN_CAPTURE'
} as const;

export function AugmentedRealityUI({
  handleBackButton,
  handleSaveSuggestion
}: {
  handleBackButton: () => void;
  handleSaveSuggestion: () => void;
}) {
  const { nudgeText, setNudgeTextWithReset, maybeHideNudgeText, webViewRef } =
    useAugmentedRealityContext();

  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const transparentBackground = useThemeColor(
    {},
    'augmentedRealityTransparentBackground'
  );
  const nudgeTextColor = useThemeColor({}, 'augmentedRealityText');

  const [currentTab, setCurrentTab] = useState<AR_UI_TAB>(AR_UI_TABS.INITIAL);
  const [showEntireUI, setShowEntireUI] = useState<boolean>(true);

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

  const switchToTab = (tab: AR_UI_TAB) => {
    if (currentTab === tab) {
      return;
    }
    if (tab === AR_UI_TABS.SCREEN_CAPTURE) {
      setCurrentTab(AR_UI_TABS.SCREEN_CAPTURE);
      // show screen capture UI
      hideItemMenu();
      setNudgeTextWithReset('Take a picture of your creation');
      // update nudge text
    } else if (tab === AR_UI_TABS.ITEM_MENU) {
      setCurrentTab(AR_UI_TABS.ITEM_MENU);
      showItemMenu();
      // hide screen capture UI
      maybeHideNudgeText();
    }
  };

  const hideItemMenuButton = currentTab === AR_UI_TABS.INITIAL;
  const isCameraButtonActive = currentTab === AR_UI_TABS.SCREEN_CAPTURE;
  const isItemMenuButtonActive = currentTab === AR_UI_TABS.ITEM_MENU;

  /* Hide UI when taking a screenshot */
  if (!showEntireUI) {
    return null;
  }

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
      {isCameraButtonActive && (
        <ScreenshotCapture
          handleSaveSuggestion={handleSaveSuggestion}
          setShowEntireUI={setShowEntireUI}
        />
      )}
      {!hideItemMenuButton && (
        <>
          <ImageButton
            source={
              ADD_SRC[colorScheme][
                isItemMenuButtonActive ? 'active' : 'inactive'
              ]
            }
            size={24}
            onPress={() => switchToTab(AR_UI_TABS.ITEM_MENU)}
            style={[
              styles.itemMenuButton,
              { backgroundColor: transparentBackground }
            ]}
            accessibilityViewIsModal
            testID="item-menu-button-tab"
            transparent={true}
            aria-selected={isItemMenuButtonActive}
          />
        </>
      )}
      <ImageButton
        source={
          CAMERA_SRC[colorScheme][isCameraButtonActive ? 'active' : 'inactive']
        }
        size={24}
        onPress={() => switchToTab(AR_UI_TABS.SCREEN_CAPTURE)}
        style={[
          styles.cameraButton,
          { backgroundColor: transparentBackground }
        ]}
        testID="camera-button-tab"
        aria-selected={isCameraButtonActive}
      />
      {nudgeText && (
        <ThemedView style={styles.nudgeTextContainer}>
          <ThemedText
            style={[
              styles.nudgeText,
              { backgroundColor: transparentBackground, color: nudgeTextColor }
            ]}
          >
            {nudgeText}
          </ThemedText>
        </ThemedView>
      )}
    </>
  );
}

type ScreenshotCaptureProps = {
  handleSaveSuggestion: () => void;
  setShowEntireUI: (show: boolean) => void;
};

function ScreenshotCapture({
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
        <TextButton
          text="Take Screenshot"
          onPress={handleScreenshot}
          testID="screenshot-button"
        />
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
  itemMenuButton: {
    position: 'absolute',
    bottom: Spacing.xlarge,
    left: Spacing.large,
    zIndex: 2
  },
  cameraButton: {
    position: 'absolute',
    bottom: Spacing.xlarge,
    right: Spacing.large,
    zIndex: 2
  },
  nudgeTextContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: Spacing.xxxlarge * 4,
    left: 0,
    right: 0,
    backgroundColor: tamuColors.transparent,
    zIndex: 2
  },
  nudgeText: {
    textAlign: 'center',
    padding: Spacing.small,
    ...Border.roundedSmall
  },
  screenCaptureContainer: {
    ...Layout.row,
    ...Layout.justifyCenter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: Spacing.xxxlarge * 3.75,
    padding: Spacing.large,
    backgroundColor: Colors.light.augmentedRealityTransparentBackground
  }
});
