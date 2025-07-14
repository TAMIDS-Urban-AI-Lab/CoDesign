import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { ImageButton } from '@/components/ui/ImageButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CAMERA_SRC, ADD_SRC } from '@/constants/ImagePaths';
import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { tamuColors } from '@/constants/Colors';
import { Border } from '@/constants/styles/Border';
import { useARContext } from '@/components/augmented-reality/ARProvider';
import { ScreenshotCapture } from '@/components/augmented-reality/ScreenshotCapture';
import { LEFT_ARROW_SRC } from '@/constants/ImagePaths';
import { ImageDetails } from '@/types/Report';

type AR_UI_TAB = 'INITIAL' | 'ITEM_MENU' | 'SCREEN_CAPTURE';

const AR_UI_TABS: Record<string, AR_UI_TAB> = {
  INITIAL: 'INITIAL',
  ITEM_MENU: 'ITEM_MENU',
  SCREEN_CAPTURE: 'SCREEN_CAPTURE'
} as const;

export function ARUserInterface({
  handleBackButton,
  handleSaveSuggestion
}: {
  handleBackButton: () => void;
  handleSaveSuggestion: (suggestion: ImageDetails) => void;
}) {
  const { nudgeText, setNudgeTextWithReset, maybeHideNudgeText, webViewRef } =
    useARContext();

  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const transparentBackground = useThemeColor({}, 'ARTransparentBackground');
  const nudgeTextColor = useThemeColor({}, 'ARText');

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
        source={LEFT_ARROW_SRC[colorScheme]}
        size={30}
        spacing={Spacing.medium}
        onPress={handleBackButton}
        style={[styles.backButton, { backgroundColor: transparentBackground }]}
        testID="close-ar-modal-button"
        transparent={true}
        accessibilityLabel="Close Suggestion Modal"
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
            testID="item-menu-button-tab"
            transparent={true}
            aria-selected={isItemMenuButtonActive}
            accessibilityLabel="Add items as suggestions"
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
        transparent={true}
        testID="camera-button-tab"
        aria-selected={isCameraButtonActive}
        accessibilityLabel="Camera view to save suggestions"
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
  }
});
