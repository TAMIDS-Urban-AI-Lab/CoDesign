export type ActionSheetOptions = {
  options?: string[];
  cancelButtonIndex?: number;
  title?: string;
};

export type ActionSheetCallback = (buttonIndex: number) => void;

export function mockActionSheet() {
  const mockShowActionSheetWithOptions = jest.fn(
    () => (_options: ActionSheetOptions, _callback: ActionSheetCallback) => {
      _callback(0);
    }
  );

  const selectMockedMenuOption = (buttonIndex: number) => {
    const menuCallback: ActionSheetCallback = mockShowActionSheetWithOptions
      .mock.calls[0][1] as unknown as ActionSheetCallback;
    menuCallback(buttonIndex);
  };

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
