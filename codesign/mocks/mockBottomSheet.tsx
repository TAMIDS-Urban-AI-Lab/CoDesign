/**
 * Mock implementation for @gorhom/bottom-sheet
 * Provides mock components and functionality for bottom sheet UI
 */

import { View } from 'react-native';

export function mockBottomSheet() {
  const mockedCloseBottomSheet = jest.fn();

  /** Mock component for the main bottom sheet with ref handling */
  const mockedBottomSheet = jest.fn(function ({ children }: any, ref: any) {
    if (ref) {
      ref.current = {
        close: mockedCloseBottomSheet
      };
    }
    return <View>{children}</View>;
  });

  /** Mock component for bottom sheet content view */
  const mockedBottomSheetView = jest.fn(function ({ children }: any) {
    return <View>{children}</View>;
  });

  // Mock the entire bottom sheet module
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
