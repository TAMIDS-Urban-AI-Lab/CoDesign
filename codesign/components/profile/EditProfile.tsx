import { StyleSheet, Image, Pressable, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
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
  liftedActionCard: {
    padding: Spacing.large,
    ...Border.roundedSmall,
    ...Border.elevated
  },
  actionCardRow: {
    ...Layout.row,
    gap: Spacing.small
  },
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    ...Border.roundedSmall,
    backgroundColor: tamuColors.primaryBrandDark
  },
  actionsList: {
    ...Layout.col,
    gap: Spacing.small
  },
  actionListItem: {
    ...Layout.row,
    ...Layout.alignCenter,
    gap: Spacing.small
  }
});

type EditProfileProps = {
  style?: ViewProps['style'];
  displayName: string;
  profileImageSrc?: string;
};

export function EditProfile({
  style,
  displayName,
  profileImageSrc
}: EditProfileProps) {
  return (
    <ThemedView style={[styles.profileContainer, style]}>
      <ThemedText type="title3">{displayName}</ThemedText>
      <ThemedView style={[styles.liftedActionCard]}>
        <ThemedView style={[styles.actionCardRow]}>
          <Image
            source={
              profileImageSrc ?? require('@/assets/images/react-logo.png')
            }
            style={styles.profileImage}
            testID="profile-image"
          />
          <ThemedView style={[styles.actionsList]}>
            <Pressable style={[styles.actionListItem]}>
              <IconSymbol
                size={EDIT_ICON_SIZE}
                name="pencil"
                color={tamuColors.gray400}
              />
              <ThemedText type="paragraph">Edit Display Name</ThemedText>
            </Pressable>
            <Pressable style={[styles.actionListItem]}>
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
