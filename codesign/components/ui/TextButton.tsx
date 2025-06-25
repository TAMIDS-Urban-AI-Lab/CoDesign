import {
  StyleSheet,
  Pressable,
  type ViewProps,
  type TextProps,
  type PressableProps
} from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Spacing } from '@/constants/styles/Spacing';
import { Typography } from '@/constants/styles/Typography';
import { useThemeColor } from '@/hooks/useThemeColor';
import { tamuColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/constants/styles/Layout';

type TextButtonType = 'primary' | 'secondary' | 'tertiary';

type TextButtonProps = PressableProps & {
  text: string;
  type?: TextButtonType;
  style?: ViewProps['style'];
  textStyle?: TextProps['style'];
  smallCaps?: boolean;
  children?: React.ReactNode;
};

export function TextButton({
  text,
  type = 'primary',
  style,
  textStyle,
  smallCaps = true,
  children,
  ...rest
}: TextButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const buttonStyle = typeToButtonStyle[type][colorScheme];
  const textColorScheme = typeToTextColor[type];
  const textColor = { color: useThemeColor(textColorScheme, 'text') };
  const textCapitalization = smallCaps ? Typography.textUppercase : {};

  return (
    <Pressable style={[styles.buttonBase, buttonStyle, style]} {...rest}>
      {children}
      <ThemedText
        type="buttonText"
        style={[textColor, textCapitalization, textStyle]}
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    height: Spacing.xxlarge,
    paddingHorizontal: Spacing.medium,
    ...Layout.row,
    ...Layout.center,
    gap: Spacing.small
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
  },
  tertiaryButtonLight: {
    backgroundColor: tamuColors.transparent
  },
  tertiaryButtonDark: {
    backgroundColor: tamuColors.transparent
  },
  centerText: {
    ...Layout.row,
    ...Layout.center,
    gap: Spacing.small
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
  },
  tertiary: {
    light: styles.tertiaryButtonLight,
    dark: styles.tertiaryButtonDark
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
  },
  tertiary: {
    light: tamuColors.primaryBrand,
    dark: tamuColors.white
  }
} as Record<string, Record<'light' | 'dark', string>>;
