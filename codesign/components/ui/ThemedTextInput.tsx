import {
  type ViewProps,
  StyleSheet,
  TextInput,
  type TextInputProps
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Spacing } from '@/constants/styles/Spacing';
import { Typography } from '@/constants/styles/Typography';

export type ThemedTextInputProps = TextInputProps & {
  textInputStyle?: ViewProps['style'];
  label: string;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  onChangeText: ((text: string) => void) | undefined;
  value?: string;
  placeholder: string;
};

export function ThemedTextInput({
  style,
  label,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  onChangeText: onChange,
  value,
  placeholder,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'text');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView>
      <ThemedText type={'formText'}>{label}</ThemedText>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor, borderColor, color: textColor },
          style
        ]}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: Spacing.small,
    padding: Spacing.medium,
    borderWidth: 1,
    marginBottom: 10,
    ...Typography.textInput
  }
});