import { type TextStyle } from 'react-native';

export const Typography = {
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  textUppercase: {
    textTransform: 'uppercase'
  }
} as Record<string, TextStyle>;
