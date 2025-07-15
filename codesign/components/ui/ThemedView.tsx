import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { tamuColors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  transparent?: boolean;
  ref?: React.Ref<View>;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  transparent = false,
  ...otherProps
}: ThemedViewProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  const backgroundColor = transparent ? tamuColors.transparent : color;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
