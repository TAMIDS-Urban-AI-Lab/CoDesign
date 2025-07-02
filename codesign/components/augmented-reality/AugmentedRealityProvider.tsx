import { createContext, useContext, useState } from 'react';
import { useRef } from 'react';
import { WebView } from 'react-native-webview';
import ViewShot from 'react-native-view-shot';

const NUDGE_TEXT_TIMEOUT = 5000;

export type AugmentedRealityContextType = {
  nudgeText: string;
  setNudgeTextWithReset: (text: string) => void;
  webViewRef: React.RefObject<WebView>;
  augmentedRealitySceneRef: React.RefObject<ViewShot>;
};

const AugmentedRealityContext = createContext<
  AugmentedRealityContextType | undefined
>(undefined);

// Custom hook to access context
export const useAugmentedRealityContext = () => {
  const context = useContext(AugmentedRealityContext);
  if (!context) {
    throw new Error(
      'useAugmentedRealityContext must be used within an AugmentedRealityProvider component'
    );
  }
  return context;
};

export const AugmentedRealityProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [nudgeText, setNudgeText] = useState('');
  const [hideTextTimerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const webViewRef = useRef<WebView>(null);
  const augmentedRealitySceneRef = useRef<ViewShot>(null);

  const setNudgeTextWithReset = (text: string) => {
    setNudgeText(text);
    if (hideTextTimerId) {
      clearTimeout(hideTextTimerId);
    }
    setTimerId(
      setTimeout(() => {
        setNudgeText('');
      }, NUDGE_TEXT_TIMEOUT)
    );
  };

  return (
    <AugmentedRealityContext.Provider
      value={{
        nudgeText,
        setNudgeTextWithReset,
        webViewRef,
        augmentedRealitySceneRef
      }}
    >
      {children}
    </AugmentedRealityContext.Provider>
  );
};
