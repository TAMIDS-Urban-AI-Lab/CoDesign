/**
 * Mock implementation for react-native-reanimated library
 * Provides basic animation components and hooks for testing
 */

import { View, Image } from 'react-native';

export function mockReactNativeReanimated() {
  /** Mock animated components with basic render functionality */
  const mockedAnimated = {
    View: jest.fn(({ children, style, ...rest }) => {
      return (
        <View style={style} {...rest}>
          {children}
        </View>
      );
    }),
    Image: jest.fn(({ source, style, ...rest }) => {
      return <Image source={source} style={style} {...rest} />;
    })
  };

  // Mock the entire react-native-reanimated module
  jest.mock('react-native-reanimated', () => {
    return {
      __esModule: true,
      default: mockedAnimated,
      /** Returns a mock shared value with initial value 0 */
      useSharedValue: jest.fn().mockReturnValue({
        value: 0
      }),
      /** Simulates timing animation by returning value and config */
      withTiming: jest.fn((value, config) => {
        return {
          value,
          config
        };
      }),
      /** Mock easing functions returning 0 */
      Easing: {
        inOut: jest.fn().mockReturnValue(0),
        back: jest.fn().mockReturnValue(0)
      },
      /** Motion reduction constants */
      ReduceMotion: {
        System: 'system',
        Always: 'always',
        Never: 'never'
      }
    };
  });
}
