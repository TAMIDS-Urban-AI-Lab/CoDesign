import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tamuColors } from '@/constants/Colors';

export default function BlurTabBarBackground() {
  return (
    <View style={styles.shadowContainer}>
      <BlurView
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}

const styles = StyleSheet.create({
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    shadowColor: tamuColors.black,
    shadowOffset: {
      width: 0,
      height: -2 // Shadow appears above the tab bar
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'visible' // Ensures shadow isn’t clipped
  }
});
