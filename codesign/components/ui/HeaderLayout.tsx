import { PropsWithChildren } from 'react';
import { StyleSheet, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Border } from '@/constants/styles/Border';
import { Layout } from '@/constants/styles/Layout';
import { Spacing } from '@/constants/styles/Spacing';
import { ThemedScrollView } from '@/components/ui/ThemedScrollView';
import { tamuColors } from '@/constants/Colors';

const styles = StyleSheet.create({
  parentContainer: {
    ...Layout.flex,
    backgroundColor: tamuColors.primaryBrand
  },
  headerContainer: {
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.large,
    paddingTop: Spacing.xxxlarge,
    backgroundColor: tamuColors.primaryBrand
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
    <ThemedView
      testID="header-layout-container"
      style={[style, styles.parentContainer]}
    >
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title2" style={styles.headerTitle}>
          {title}
        </ThemedText>
      </ThemedView>
      <ThemedScrollView
        testID="themed-scroll-view"
        style={styles.childrenContainer}
        scrollToOverflowEnabled={false}
      >
        {children}
      </ThemedScrollView>
    </ThemedView>
  );
}
