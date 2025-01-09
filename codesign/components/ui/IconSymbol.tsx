// This file is a fallback for using Ionicons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';

import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to Ionicons mappings here.
const MAPPING = {
  // See Ionicons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home-sharp',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'chevron-forward',
  'chevron.right': 'chevron-back',
  'map.fill': 'map',
  pencil: 'pencil-sharp',
  'person.crop.circle.fill': 'person-circle',
  'camera.fill': 'camera',
  'photo.fill': 'image-outline'
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof Ionicons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and Ionicons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to Ionicons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <Ionicons color={color} size={size} name={MAPPING[name]} style={style} />
  );
}
