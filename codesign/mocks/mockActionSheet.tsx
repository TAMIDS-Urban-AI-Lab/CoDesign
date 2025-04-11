export type ActionSheetOptions = {
  options?: string[];
  cancelButtonIndex?: number;
  title?: string;
};

export type ActionSheetCallback = (buttonIndex: number) => void;

export function mockActionSheet() {
  const mockActionSheet = jest.fn(
    () => (_options: ActionSheetOptions, _callback: ActionSheetCallback) => {
      _callback(0);
    }
  );
  jest.mock('@expo/react-native-action-sheet', () => {
    return {
      __esModule: true,
      ...jest.requireActual('@expo/react-native-action-sheet'),
      useActionSheet: () => ({
        showActionSheetWithOptions: mockActionSheet
      })
    };
  });
  return {
    mockShowActionSheetWithOptions: mockActionSheet
  };
}
