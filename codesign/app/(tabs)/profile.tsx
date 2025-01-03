import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { EditProfile } from '@/components/profile/EditProfile';
import { Spacing } from '@/constants/styles/Spacing';
import { HeaderLayout } from '@/components/shared/HeaderLayout';
import { TextButton } from '@/components/shared/TextButton';

const styles = StyleSheet.create({
  profileContainer: {
    paddingBottom: Spacing.large
  },
  actionContainer: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.large
  }
});

export default function TabTwoScreen() {
  return (
    <HeaderLayout title="Profile">
      <EditProfile style={styles.profileContainer} />

      <ThemedView style={styles.actionContainer}>
        <TextButton text="Log Out" type="secondary" />
      </ThemedView>
    </HeaderLayout>
  );
}
