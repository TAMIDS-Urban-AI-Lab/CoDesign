import { type ModalProps, StyleSheet, Pressable } from 'react-native';

import { ThemedView } from '../ThemedView';
import { Layout } from '@/constants/styles/Layout';
import { Border } from '@/constants/styles/Border';
import { Spacing } from '@/constants/styles/Spacing';
import { ThemedModal } from '@/components/ui/ThemedModal';

export type FloatingModalProps = ModalProps & {
  closeModal: () => void;
  children: React.ReactNode;
};

export function FloatingModal({
  children,
  closeModal,
  ...otherProps
}: FloatingModalProps) {
  return (
    <ThemedModal transparent={true} animationType="fade" {...otherProps}>
      <Pressable onPress={closeModal} style={styles.modalContainer}>
        <ThemedView style={styles.modal}>{children}</ThemedView>
      </Pressable>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    ...Layout.flex,
    ...Layout.center,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modal: {
    ...Layout.center,
    ...Border.roundedSmall,
    ...Border.elevated,
    padding: Spacing.large
  }
});
