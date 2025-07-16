import { createContext, useContext, useState } from 'react';
import { useRef } from 'react';
import { WebView } from 'react-native-webview';
import ViewShot from 'react-native-view-shot';

const NUDGE_TEXT_TIMEOUT = 5000;

export type ARContextType = {
  nudgeText: string;
  setNudgeTextWithReset: (text: string) => void;
  maybeHideNudgeText: () => void;
  webViewRef: React.RefObject<WebView>;
  ARSceneRef: React.RefObject<ViewShot>;
};

const ARContext = createContext<ARContextType | undefined>(undefined);

// Custom hook to access context
export const useARContext = () => {
  const context = useContext(ARContext);
  if (!context) {
    throw new Error('useARContext must be used within an ARProvider component');
  }
  return context;
};

export const ARProvider = ({ children }: { children: React.ReactNode }) => {
  // Shared state between Scene and UI
  const [nudgeText, setNudgeText] = useState('');
  const [hideTextTimerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const webViewRef = useRef<WebView>(null);
  const ARSceneRef = useRef<ViewShot>(null);

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

  const maybeHideNudgeText = () => {
    if (hideTextTimerId) {
      clearTimeout(hideTextTimerId);
      setTimerId(null);
    }
    setNudgeText('');
  };

  return (
    <ARContext.Provider
      value={{
        nudgeText,
        setNudgeTextWithReset,
        maybeHideNudgeText,
        webViewRef,
        ARSceneRef
      }}
    >
      {children}
    </ARContext.Provider>
  );
};
