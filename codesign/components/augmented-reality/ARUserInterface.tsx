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
import { TextButton } from '@/components/ui/TextButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  SharedValue
} from 'react-native-reanimated';

type AR_UI_TAB =
  | 'INITIAL'
  | 'ITEM_MENU'
  | 'SCREEN_CAPTURE'
  | 'CONFIRM_SUGGESTION';

const AR_UI_TABS: Record<string, AR_UI_TAB> = {
  INITIAL: 'INITIAL',
  ITEM_MENU: 'ITEM_MENU',
  SCREEN_CAPTURE: 'SCREEN_CAPTURE',
  CONFIRM_SUGGESTION: 'CONFIRM_SUGGESTION'
} as const;

export function ARUserInterface({
  suggestions,
  handleBackButton,
  handleSaveSuggestions,
  closeARModal
}: {
  suggestions: ImageDetails[];
  handleBackButton: () => void;
  handleSaveSuggestions: (suggestions: ImageDetails[]) => void;
  closeARModal: () => void;
}) {
  const { nudgeText, setNudgeTextWithReset, maybeHideNudgeText, webViewRef } =
    useARContext();

  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const transparentBackground = useThemeColor({}, 'ARTransparentBackground');
  const nudgeTextColor = useThemeColor({}, 'ARText');

  const [currentTab, setCurrentTab] = useState<AR_UI_TAB>(AR_UI_TABS.INITIAL);
  const [showEntireUI, setShowEntireUI] = useState<boolean>(true);

  const suggestionImageOpacity: SharedValue<number> = useSharedValue(0);
  const suggestionImageScale: SharedValue<number> = useSharedValue(0.95);

  const suggestionImageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: suggestionImageOpacity.value,
    transform: [{ scale: suggestionImageScale.value }]
  }));

  /* Hide UI when taking a screenshot */
  if (!showEntireUI) {
    return null;
  }

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

  const isCameraButtonActive = currentTab === AR_UI_TABS.SCREEN_CAPTURE;
  const isItemMenuButtonActive = currentTab === AR_UI_TABS.ITEM_MENU;
  const isConfirmSuggestionTabActive =
    currentTab === AR_UI_TABS.CONFIRM_SUGGESTION;

  const showCameraButton = [
    AR_UI_TABS.INITIAL,
    AR_UI_TABS.SCREEN_CAPTURE,
    AR_UI_TABS.ITEM_MENU
  ].includes(currentTab);

  const showMenuItemsButton = [
    AR_UI_TABS.SCREEN_CAPTURE,
    AR_UI_TABS.ITEM_MENU
  ].includes(currentTab);

  const showBackButton = [
    AR_UI_TABS.INITIAL,
    AR_UI_TABS.SCREEN_CAPTURE,
    AR_UI_TABS.ITEM_MENU
  ].includes(currentTab);

  maybeAnimatesuggestionImage(
    isConfirmSuggestionTabActive,
    suggestionImageOpacity,
    suggestionImageScale
  );

  return (
    <>
      {showBackButton && (
        <ImageButton
          source={LEFT_ARROW_SRC[colorScheme]}
          size={30}
          spacing={Spacing.medium}
          onPress={handleBackButton}
          style={[
            styles.backButton,
            { backgroundColor: transparentBackground }
          ]}
          testID="close-ar-modal-button"
          transparent={true}
          accessibilityLabel="Close Suggestion Modal"
        />
      )}
      {isCameraButtonActive && (
        <ScreenshotCapture
          handleSaveSuggestions={handleSaveSuggestions}
          setShowEntireUI={setShowEntireUI}
          afterScreenshotCallback={() => {
            setCurrentTab(AR_UI_TABS.CONFIRM_SUGGESTION);
          }}
        />
      )}
      {showMenuItemsButton && (
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
      {showCameraButton && (
        <ImageButton
          source={
            CAMERA_SRC[colorScheme][
              isCameraButtonActive ? 'active' : 'inactive'
            ]
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
      )}
      {isConfirmSuggestionTabActive && (
        <ThemedView
          style={[
            styles.confirmSuggestionContainer,
            { backgroundColor: '#00000099' }
          ]}
          transparent={true}
        >
          <Animated.Image
            source={{ uri: suggestions[0].uri }}
            style={[styles.suggestionImage, suggestionImageAnimatedStyle]}
            accessibilityLabel={'Uploaded suggestion'}
            testID={`uploaded-suggestion`}
          />
          <ThemedView
            style={styles.confirmSuggestionActions}
            transparent={true}
          >
            <TextButton
              text={'Retake'}
              type="secondary"
              onPress={() => {
                handleSaveSuggestions([]);
                setCurrentTab(AR_UI_TABS.SCREEN_CAPTURE);
              }}
              style={{ backgroundColor: '#ffffff99' }}
            />
            <TextButton
              text={'Save Suggestion'}
              onPress={() => {
                closeARModal();
              }}
            />
          </ThemedView>
        </ThemedView>
      )}
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

function maybeAnimatesuggestionImage(
  isConfirmSuggestionTabActive: boolean,
  suggestionImageOpacity: SharedValue<number>,
  suggestionImageScale: SharedValue<number>
) {
  if (isConfirmSuggestionTabActive) {
    suggestionImageOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.ease)
    });
    suggestionImageScale.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.ease)
    });
  } else {
    suggestionImageOpacity.value = 0;
    suggestionImageScale.value = 0.95;
  }
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
  confirmSuggestionContainer: {
    // ...Layout.flex,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Layout.center,
    padding: Spacing.large,
    // backgroundColor: 'red',
    // ...Layout.justifyCenter,
    // ...Layout.alignCenter,
    zIndex: 1
  },
  suggestionImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    // backgroundColor: tamuColors.gray200,
    // width: '100%',
    // height: '100%',
    ...Border.roundedSmall
  },
  confirmSuggestionActions: {
    ...Layout.row,
    // ...Layout.justifySpaceBetween,
    ...Layout.center,
    gap: Spacing.medium,
    marginTop: Spacing.medium
  }
});
