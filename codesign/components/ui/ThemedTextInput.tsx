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
  value?: string | number;
  placeholder: string;
  errorText?: string;
  required?: boolean;
};

export function ThemedTextInput({
  style,
  label,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  onChangeText,
  value,
  placeholder,
  errorText,
  required,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'text');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView>
      <ThemedText type={'formText'}>
        {label}
        {required && <ThemedText type="error">*</ThemedText>}
      </ThemedText>
      {errorText && <ThemedText type={'error'}>{errorText}</ThemedText>}
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor, borderColor, color: textColor },
          style
        ]}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        value={value?.toString()}
        placeholder={placeholder}
        accessibilityLabel={required ? `${label} (required)` : label}
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
