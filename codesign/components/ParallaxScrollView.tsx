import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';

const HEADER_HEIGHT = 160;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  isFullScreen?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  isFullScreen = true
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] }
        ]}
      >
        {headerImage}
      </ThemedView>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Layout.flex,
    ...Border.roundedTopLarge
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    ...Border.roundedTopLarge
  },
  content: {
    ...Layout.flex,
    padding: Spacing.large
  }
});
