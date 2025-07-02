import { StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { Layout } from '@/constants/styles/Layout';
import { useAugmentedRealityContext } from '@/components/augmented-reality/AugmentedRealityProvider';

const AR_ITEM_NAMES = {
  TRASH: 'Trash',
  BUS_STOP: 'Bus Stop',
  BENCH: 'Bench',
  REMOVE: 'Remove'
};
const AR_ITEM_NAMES_LIST = Object.values(AR_ITEM_NAMES);

const AR_SCENE_PROD_URL = 'https://tamucodesign.8thwall.app/tap-menu/';

export function AugmentedRealityScene() {
  const { setNudgeTextWithReset, webViewRef, augmentedRealitySceneRef } =
    useAugmentedRealityContext();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    const webViewMessage = event.nativeEvent.data;
    if (AR_ITEM_NAMES_LIST.includes(webViewMessage)) {
      handleSelectItem(webViewMessage);
    }
  };

  const handleSelectItem = (itemName: string) => {
    if (itemName === AR_ITEM_NAMES.REMOVE) {
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
          /* handle messages from the webview */
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
