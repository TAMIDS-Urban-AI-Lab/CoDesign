import { StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { Layout } from '@/constants/styles/Layout';
import { useAugmentedRealityContext } from '@/components/augmented-reality/AugmentedRealityProvider';
import { AR_ITEMS, AR_ITEM_NAMES } from '@/constants/augmented-reality/Items';

const AR_SCENE_PROD_URL = 'https://tamucodesign.8thwall.app/tap-menu/';

export function AugmentedRealityScene() {
  const { setNudgeTextWithReset, webViewRef, augmentedRealitySceneRef } =
    useAugmentedRealityContext();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    const webViewMessage = event.nativeEvent.data;
    if (AR_ITEM_NAMES.includes(webViewMessage)) {
      handleSelectItem(webViewMessage);
    }
  };

  const handleSelectItem = (itemName: string) => {
    if (itemName === AR_ITEMS.REMOVE) {
      setNudgeTextWithReset('Tap an item to remove it.');
    } else {
      setNudgeTextWithReset(`Tap ground to place the ${itemName}`);
    }
  };

  return (
    <>
      <ViewShot
        style={[styles.modalContentContainer]}
        ref={augmentedRealitySceneRef}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: AR_SCENE_PROD_URL }}
          onMessage={handleWebViewMessage}
          /* Prevents weird full screen behavior on iOS */
          allowsInlineMediaPlayback={true}
        />
      </ViewShot>
    </>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    ...Layout.flex
  }
});
