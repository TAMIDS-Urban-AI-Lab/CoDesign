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
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'OpenSansRegular'
  },
  paragraphBold: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'OpenSansBold'
  },
  paragraphItalic: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'OpenSansItalic'
  },
  title1: {
    fontSize: 52,
    lineHeight: 66,
    fontFamily: 'OswaldRegular'
  },
  title2: {
    fontSize: 32,
    lineHeight: 48,
    fontFamily: 'OswaldRegular'
  },
  title3: {
    fontSize: 24,
    lineHeight: 33,
    fontFamily: 'WorkSansSemiBold'
  },
  title4: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'OpenSansRegular'
  },
  title5: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'WorkSansBold'
  },
  feedback: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'OpenSansItalic'
  },
  error: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'OpenSansItalic'
  },
  formText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'WorkSansRegular'
  },
  link: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'OpenSansBold',
    textDecorationLine: 'underline'
  }
} as Record<string, TextStyle>;
