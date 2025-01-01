import { StyleSheet, Image, Pressable, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Border } from '@/constants/styles/Border';
import { Spacing } from '@/constants/styles/Spacing';
import { tamuColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Layout } from '@/constants/styles/Layout';

const PROFILE_IMAGE_SIZE = 64;
const EDIT_ICON_SIZE = 28;

const styles = StyleSheet.create({
  profileContainer: {
    gap: Spacing.large
  },
  actionContainer: {
    padding: Spacing.large,
    ...Border.roundedSmall,
    ...Border.elevated
  }
});

export function EditProfile({ style }: ViewProps) {
  return (
    <ThemedView style={[styles.profileContainer, style]}>
      <ThemedText type="title3">Scott Banazone</ThemedText>
      <ThemedView style={[styles.actionContainer]}>
        <ThemedView style={[Layout.row, { gap: Spacing.medium }]}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={{
              width: PROFILE_IMAGE_SIZE,
              height: PROFILE_IMAGE_SIZE,
              ...Border.roundedSmall,
              backgroundColor: tamuColors.primaryBrandDark
            }}
          />
          <ThemedView style={[Layout.col, { gap: Spacing.small }]}>
            <Pressable style={[Layout.row, { gap: Spacing.small }]}>
              <IconSymbol
                size={EDIT_ICON_SIZE}
                name="pencil"
                color={tamuColors.gray400}
              />
              <ThemedText type="paragraph">Edit Display Name</ThemedText>
            </Pressable>
            <Pressable style={[Layout.row, { gap: Spacing.small }]}>
              <IconSymbol
                size={EDIT_ICON_SIZE}
                name="camera.fill"
                color={tamuColors.gray400}
              />
              <ThemedText type="paragraph">Choose Profile Picture</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
