import {
  StyleSheet,
  Pressable,
  type ViewProps,
  type PressableProps,
  Image,
  ImageSourcePropType
} from 'react-native';

import { Spacing } from '@/constants/styles/Spacing';
import { Layout } from '@/constants/styles/Layout';
import { ThemedView } from '@/components/ui/ThemedView';
import { Border } from '@/constants/styles/Border';

type ImageButtonProps = PressableProps & {
  style?: ViewProps['style'];
  transparent?: boolean;
  size?: number;
  elevated?: boolean;
  source: ImageSourcePropType;
};

export function ImageButton({
  style,
  transparent = false,
  elevated = false,
  size = 24,
  source,
  ...rest
}: ImageButtonProps) {
  const imageSize = { width: size, height: size };
  const buttonSize = {
    width: size + Spacing.large,
    height: size + Spacing.large
  };
  const elevation = elevated ? Border.elevated : {};

  return (
    <ThemedView
      style={[styles.buttonContainer, buttonSize, elevation, style]}
      transparent={transparent}
    >
      <Pressable {...rest}>
        <Image source={source} style={[imageSize]}></Image>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    ...Layout.center,
    borderRadius: '50%'
  },
  buttonBase: {
    ...Layout.flex,
    ...Layout.center
  }
});
