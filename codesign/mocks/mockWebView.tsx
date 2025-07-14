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
    return {
      __esModule: true,
      WebView: mockWebView
    };
  });

  return { mockWebView };
}
