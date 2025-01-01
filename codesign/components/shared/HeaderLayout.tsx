import { PropsWithChildren } from 'react';
import { StyleSheet, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';

const styles = StyleSheet.create({
  parentContainer: {
    ...Layout.flex,
    backgroundColor: 'maroon'
  },
  headerContainer: {
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.large,
    paddingTop: Spacing.xxxlarge,
    backgroundColor: 'maroon'
  },
  headerTitle: {
    color: 'white'
  },
  childrenContainer: {
    ...Layout.flex,
    ...Border.roundedTopLarge,
    ...Border.elevated,
    padding: Spacing.large
  }
});

type HeaderLayoutProps = PropsWithChildren<{
  style?: ViewProps['style'];
  title: string;
}>;

export function HeaderLayout({ title, style, children }: HeaderLayoutProps) {
  return (
    <ThemedView style={[style, styles.parentContainer]}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title2" style={styles.headerTitle}>
          {title}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.childrenContainer}>{children}</ThemedView>
    </ThemedView>
  );
}
