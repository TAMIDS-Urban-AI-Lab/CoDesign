import { View } from 'react-native';

export function mockRNWebView() {
  /** Mock component for MapView with ref handling */
  const mockWebView = jest.fn(function ({ children }: any, ref: any) {
    if (ref) {
      ref.current = {
        injectJavaScript: jest.fn()
      };
    }
    return <View testID="webview-mock"> WebView Mock {children}</View>;
  });

  jest.mock('react-native-webview', () => {
    const { forwardRef } = jest.requireActual('react');
    return {
      __esModule: true,
      WebView: forwardRef(mockWebView),
      WebViewMessageEvent: jest.fn()
    };
  });

  return { mockWebView };
}
