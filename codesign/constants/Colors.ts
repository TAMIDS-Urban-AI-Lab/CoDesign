/**
 * Below are the colors that are used in the app.
 */

export const tamuColors = {
  primaryBrand: '#500000',
  primaryBrandDark: '#3c0000',
  primaryBrandLight: '#732f2f',
  white: '#ffffff',
  gray100: '#f6f6f6',
  gray200: '#eaeaea',
  gray300: '#d1d1d1',
  gray400: '#a7a7a7',
  gray500: '#707070',
  gray600: '#626262',
  gray700: '#535353',
  gray800: '#3e3e3e',
  gray900: '#202020',
  black: '#000000',
  accentCream: '#d6d3c4',
  accentIvory: '#e9e4dc',
  accentGold: '#af8846',
  transparent: '#00000000'
};

const selectedColorLight = tamuColors.primaryBrand;
const selectedColorDark = tamuColors.white;

export const Colors = {
  light: {
    text: tamuColors.black,
    background: tamuColors.white,
    tint: selectedColorLight,
    icon: tamuColors.gray500,
    tabIconDefault: tamuColors.gray500,
    tabIconSelected: selectedColorLight,
    error: '#bd1206',
    augmentedRealityTransparentBackground: '#00000099',
    augmentedRealityText: '#ECEDEE'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: selectedColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: selectedColorDark,
    error: '#e34f44',
    augmentedRealityTransparentBackground: '#ffffff99',
    augmentedRealityText: tamuColors.black
  }
};
