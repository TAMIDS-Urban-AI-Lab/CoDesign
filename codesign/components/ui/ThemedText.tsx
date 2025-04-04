import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ui/ThemedView';
import { Layout } from '@/constants/styles/Layout';
import { Typography } from '@/constants/styles/Typography';
import { tamuColors } from '@/constants/Colors';
import { Spacing } from '@/constants/styles/Spacing';

type ThemedTextType =
  | 'paragraph'
  | 'paragraphBold'
  | 'paragraphItalic'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'
  | 'feedback'
  | 'error'
  | 'link'
  | 'formText';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextType;
  withDivider?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'paragraph',
  withDivider = false,
  ...rest
}: ThemedTextProps) {
  var defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );
  var errorColor = useThemeColor({}, 'error');
  var textColor = type === 'error' ? errorColor : defaultColor;

  const typography = getTypographyByType(type);

  if (withDivider) {
    return (
      <ThemedView
        style={[Layout.row, Layout.center, { gap: Spacing.small }, style]}
      >
        <Text style={[{ color: textColor }, typography]} {...rest} />
        <ThemedView style={[styles.divider]} testID="themed-text-divider" />
      </ThemedView>
    );
  }

  return <Text style={[{ color: textColor }, typography, style]} {...rest} />;
}

/**
 * Looks up the typography for the given type,
 * defaults to paragraph style
 */
function getTypographyByType(type: ThemedTextType) {
  return Typography[type] || Typography.paragraph;
}

const styles = StyleSheet.create({
  divider: {
    ...Layout.flex,
    height: 1,
    backgroundColor: tamuColors.gray400
  }
});
