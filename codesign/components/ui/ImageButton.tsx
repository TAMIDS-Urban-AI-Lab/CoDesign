import {
  StyleSheet,
  Pressable,
  type ViewProps,
  type PressableProps,
  Image,
  ImageSourcePropType
} from 'react-native';

import { Spacing } from '@/constants/styles/Spacing';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Layout } from '@/constants/styles/Layout';

type ImageButtonProps = PressableProps & {
  style?: ViewProps['style'];
  transparent?: boolean;
  size?: number;
  source: ImageSourcePropType;
};

export function ImageButton({
  style,
  transparent = false,
  size = 24,
  source,
  ...rest
}: ImageButtonProps) {
  const themeColor = useThemeColor({}, 'background');
  const backgroundColor = transparent ? {} : themeColor;
  const buttonSize = { width: size, height: size };

  return (
    <Pressable
      style={[backgroundColor, buttonSize, styles.buttonBase, style]}
      {...rest}
    >
      <Image source={source} style={[buttonSize]}></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    ...Layout.flex,
    ...Layout.center,
    padding: Spacing.small,
    borderRadius: '50%'
  }
});
