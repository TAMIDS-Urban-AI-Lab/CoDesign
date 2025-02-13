import { ScrollView, type ScrollViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  ref?: React.RefObject<ScrollView>;
};

export function ThemedScrollView({
  style,
  ref,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      ref={ref}
      {...otherProps}
    />
  );
}
