import { useFonts as useFontsHook } from 'expo-font';

export function useFonts() {
  return useFontsHook({
    OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),
    OpenSansItalic: require('../assets/fonts/OpenSans-Italic.ttf'),
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
    OswaldRegular: require('../assets/fonts/Oswald-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    WorkSansBold: require('../assets/fonts/WorkSans-Bold.ttf'),
    WorkSansSemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf')
  });
}
