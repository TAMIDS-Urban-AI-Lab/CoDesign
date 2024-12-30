import { tamuColors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <View style={styles.shadowContainer}>
      <View></View>
    </View>
  );
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
    elevation: 5, // For Android compatibility
    overflow: 'visible' // Ensures shadow isn’t clipped
  }
});

export function useBottomTabOverflow() {
  return 0;
}
