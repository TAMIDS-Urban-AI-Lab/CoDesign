import { Modal, type ModalProps, StyleSheet, Pressable } from 'react-native';

import { ThemedView } from '../ThemedView';
import { Layout } from '@/constants/styles/Layout';
import { Border } from '@/constants/styles/Border';
import { Spacing } from '@/constants/styles/Spacing';

export type ThemedModalProps = ModalProps & {
  lightColor?: string;
  darkColor?: string;
  closeModal: () => void;
  children: React.ReactNode;
};

export function ThemedModal({
  lightColor,
  darkColor,
  children,
  closeModal,
  ...otherProps
}: ThemedModalProps) {
  return (
    <Modal transparent={true} animationType="fade" {...otherProps}>
      <Pressable onPress={closeModal} style={styles.modalContainer}>
        <ThemedView style={styles.modal}>{children}</ThemedView>
      </Pressable>
    </Modal>
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
