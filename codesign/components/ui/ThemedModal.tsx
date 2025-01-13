import { Modal, type ModalProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedModalProps = ModalProps & {
  lightColor?: string;
  darkColor?: string;
  children: React.ReactNode;
};

export function ThemedModal({
  lightColor,
  darkColor,
  children,
  style,
  ...otherProps
}: ThemedModalProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <Modal
      transparent={true}
      animationType="fade"
      {...otherProps}
      style={[{ backgroundColor }, style]}
    >
      {children}
    </Modal>
  );
}
