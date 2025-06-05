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
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansRegular'
  },
  paragraphBold: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansBold'
  },
  paragraphItalic: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansItalic'
  },
  title1: {
    fontSize: 52,
    lineHeight: 66,
    fontFamily: 'OswaldRegular'
  },
  title2: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'OswaldRegular'
  },
  title3: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'WorkSansSemiBold'
  },
  title4: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'OpenSansRegular'
  },
  title5: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'WorkSansBold'
  },
  feedback: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansItalic'
  },
  error: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansItalic'
  },
  formText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'WorkSansRegular'
  },
  buttonText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'WorkSansBold'
  },
  link: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'OpenSansBold',
    textDecorationLine: 'underline'
  }
} as Record<string, TextStyle>;
