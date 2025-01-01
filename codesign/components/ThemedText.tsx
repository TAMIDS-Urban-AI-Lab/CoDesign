import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTextType =
  | 'paragraph'
  | 'paragraphBold'
  | 'paragraphItalic'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'
  | 'title6'
  | 'link';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextType;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'paragraph',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const typeStyle = getStyleType(type);

  return <Text style={[{ color }, typeStyle, style]} {...rest} />;
}

/**
 * Looks up the style for the given type,
 * defaults to paragraph style
 */
function getStyleType(type: ThemedTextType) {
  return styles[type] || styles.paragraph;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'OpenSansRegular'
  },
  paragraphBold: {
    fontSize: 16,
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
  title6: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'OpenSansItalic'
  },
  link: {
    fontSize: 18,
    lineHeight: 25,
    fontFamily: 'OpenSansBold',
    textDecorationLine: 'underline'
  }
});
