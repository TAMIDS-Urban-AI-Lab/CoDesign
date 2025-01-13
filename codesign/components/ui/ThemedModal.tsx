import { Modal, type ModalProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedModalProps = ModalProps & {
  lightColor?: string;
  darkColor?: string;
  transparent?: boolean;
  children: React.ReactNode;
};

export function ThemedModal({
  lightColor,
  darkColor,
  children,
  style,
  transparent = false,
  ...otherProps
}: ThemedModalProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <Modal
      transparent={transparent}
      animationType="fade"
      {...otherProps}
      style={[{ backgroundColor }, style]}
    >
      {children}
    </Modal>
  );
}
