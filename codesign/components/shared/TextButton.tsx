import {
  StyleSheet,
  Pressable,
  type ViewProps,
  type TextProps
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/styles/Spacing';
import { Typography } from '@/constants/styles/Typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { tamuColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/constants/styles/Layout';

type TextButtonType = 'primary' | 'secondary';

type TextButtonProps = {
  text: string;
  type?: TextButtonType;
  style?: ViewProps['style'];
  textStyle?: TextProps['style'];
};

export function TextButton({
  text,
  type = 'primary',
  style,
  textStyle
}: TextButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const buttonStyle = typeToButtonStyle[type][colorScheme];
  const textColorScheme = typeToTextColor[type];
  const textColor = { color: useThemeColor(textColorScheme, 'text') };

  return (
    <Pressable style={[styles.buttonBase, buttonStyle, style]}>
      <ThemedText
        type="title5"
        style={[textColor, Typography.textUppercase, textStyle]}
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    height: Spacing.xxlarge,
    ...Layout.center
  },
  primaryButtonLight: {
    backgroundColor: tamuColors.primaryBrand
  },
  primaryButtonDark: {
    backgroundColor: tamuColors.white
  },
  secondaryButtonLight: {
    backgroundColor: tamuColors.transparent,
    borderWidth: 2,
    borderColor: tamuColors.primaryBrand
  },
  secondaryButtonDark: {
    backgroundColor: tamuColors.transparent,
    borderWidth: 2,
    borderColor: tamuColors.accentGold
  }
});

const typeToButtonStyle = {
  primary: {
    light: styles.primaryButtonLight,
    dark: styles.primaryButtonDark
  },
  secondary: {
    light: styles.secondaryButtonLight,
    dark: styles.secondaryButtonDark
  }
};

const typeToTextColor = {
  primary: {
    light: tamuColors.white,
    dark: tamuColors.primaryBrand
  },
  secondary: {
    light: tamuColors.primaryBrand,
    dark: tamuColors.white
  }
} as Record<string, Record<'light' | 'dark', string>>;
