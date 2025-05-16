/**
 * Mock implementation for @expo/react-native-action-sheet
 * Provides mock functionality for native action sheets with option selection
 */

/** Options for configuring the action sheet */
export type ActionSheetOptions = {
  options?: string[];
  cancelButtonIndex?: number;
  title?: string;
};

export type ActionSheetCallback = (buttonIndex: number) => void;

export function mockActionSheet() {
  /** Mock function for showing action sheet, defaults to selecting first option */
  const mockShowActionSheetWithOptions = jest.fn(
    () => (_options: ActionSheetOptions, _callback: ActionSheetCallback) => {
      _callback(0);
    }
  );

  /** Helper function to simulate user selecting a specific menu option */
  const selectMockedMenuOption = (buttonIndex: number) => {
    const menuCallback: ActionSheetCallback = mockShowActionSheetWithOptions
      .mock.calls[0][1] as unknown as ActionSheetCallback;
    menuCallback(buttonIndex);
  };

  // Mock the entire action sheet module
  jest.mock('@expo/react-native-action-sheet', () => {
    return {
      __esModule: true,
      ...jest.requireActual('@expo/react-native-action-sheet'),
      useActionSheet: () => ({
        showActionSheetWithOptions: mockShowActionSheetWithOptions
      })
    };
  });
  return {
    mockShowActionSheetWithOptions: mockShowActionSheetWithOptions,
    selectMockedMenuOption: selectMockedMenuOption
  };
}
