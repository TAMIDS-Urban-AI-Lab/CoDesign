import { View } from 'react-native';

export function mockBottomSheet() {
  const mockedCloseBottomSheet = jest.fn();
  const mockedBottomSheet = jest.fn(function ({ children }: any, ref: any) {
    if (ref) {
      ref.current = {
        close: mockedCloseBottomSheet
      };
    }
    return <View>{children}</View>;
  });
  const mockedBottomSheetView = jest.fn(function ({ children }: any) {
    return <View>{children}</View>;
  });

  jest.mock('@gorhom/bottom-sheet', () => {
    const { forwardRef } = jest.requireActual('react');
    return {
      __esModule: true,
      default: forwardRef(mockedBottomSheet),
      BottomSheetView: mockedBottomSheetView
    };
  });

  return {
    mockedCloseBottomSheet,
    mockedBottomSheet
  };
}
