import { View, Image } from 'react-native';

export function mockReactNativeReanimated() {
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

  jest.mock('react-native-reanimated', () => {
    return {
      __esModule: true,
      default: mockedAnimated,
      useSharedValue: jest.fn().mockReturnValue({
        value: 0
      }),
      withTiming: jest.fn((value, config) => {
        return {
          value,
          config
        };
      }),
      Easing: {
        inOut: jest.fn().mockReturnValue(0),
        back: jest.fn().mockReturnValue(0)
      },
      ReduceMotion: {
        System: 'system',
        Always: 'always',
        Never: 'never'
      }
    };
  });
}
