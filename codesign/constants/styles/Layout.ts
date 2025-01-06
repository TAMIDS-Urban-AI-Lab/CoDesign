import { ViewStyle } from 'react-native';

export const Layout = {
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flexDirection: 'column'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  justifySpaceAround: {
    justifyContent: 'space-around'
  },
  justifySpaceEvenly: {
    justifyContent: 'space-evenly'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
} as Record<string, ViewStyle>;
