import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import { EditProfile } from '@/components/profile/EditProfile';
import { Spacing } from '@/constants/styles/Spacing';
import { HeaderLayout } from '@/components/ui/HeaderLayout';
import { TextButton } from '@/components/ui/TextButton';

const styles = StyleSheet.create({
  profileContainer: {
    paddingBottom: Spacing.large
  },
  actionContainer: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.large
  }
});

export default function ProfileScreen() {
  return (
    <HeaderLayout title="Profile">
      <EditProfile
        style={styles.profileContainer}
        displayName="Scott Banazone"
      />

      <ThemedView style={styles.actionContainer}>
        <TextButton text="Log Out" type="secondary" />
      </ThemedView>
    </HeaderLayout>
  );
}
