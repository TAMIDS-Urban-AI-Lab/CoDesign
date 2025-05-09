import { CheckBox } from 'react-native-elements';
import {
  GestureResponderEvent,
  type TextProps,
  StyleSheet,
  Image
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Typography } from '@/constants/styles/Typography';
import { ThemedText } from '@/components/ui/ThemedText';
import { Spacing } from '@/constants/styles/Spacing';

export type ThemedRadiobButtonProps = {
  style?: TextProps['style'];
  title: string;
  checked: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const CHECKED_RADIO_SRC = {
  light: require('@/assets/images/radio-button/checked-light.png'),
  dark: require('@/assets/images/radio-button/checked-dark.png')
};

const UNCHECKED_RADIO_SRC = {
  light: require('@/assets/images/radio-button/unchecked-light.png'),
  dark: require('@/assets/images/radio-button/unchecked-dark.png')
};

export function ThemedRadioButton({
  style,
  title,
  checked,
  onPress
}: ThemedRadiobButtonProps) {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <CheckBox
      testID={`themed-radio-button-${title}`}
      containerStyle={[
        { backgroundColor: backgroundColor },
        styles.radioButtonContainer
      ]}
      textStyle={[{ color: textColor }, { ...Typography.formText }]}
      title={
        <ThemedText
          type="formText"
          style={[{ marginLeft: Spacing.small }, style]}
        >
          {title}
        </ThemedText>
      }
      checked={checked}
      onPress={onPress}
      checkedIcon={
        <Image
          testID="radio-button-icon"
          source={CHECKED_RADIO_SRC[colorScheme]}
          style={styles.radioButtonImage}
        />
      }
      uncheckedIcon={
        <Image
          testID="radio-button-icon"
          source={UNCHECKED_RADIO_SRC[colorScheme]}
          style={styles.radioButtonImage}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    borderWidth: 0,
    margin: 0,
    paddingVertical: Spacing.xsmall
  },
  radioButtonText: {
    ...Typography.formText
  },
  radioButtonImage: {
    width: 25,
    height: 25
  }
});
