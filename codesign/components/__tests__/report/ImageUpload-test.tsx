import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import {
  ActionSheetCallback,
  ActionSheetOptions,
  mockActionSheet
} from '@/mocks/mockActionSheet';
import { mockExpoImagePicker } from '@/mocks/mockExpoImagePicker';
import { mockExpoImageManipulator } from '@/mocks/mockExpoImageManipulator';
import { mockExpoMediaLibrary } from '@/mocks/mockExpoMediaLibrary';
import { ImageDetails } from '@/types/Report';

describe('<ImageUpload />', () => {
  // Set up action sheet mocks
  const { mockShowActionSheetWithOptions } = mockActionSheet();
  const expectedMenuOptions = {
    useCamera: 0,
    uploadFromLibrary: 1,
    cancel: 2
  };

  // Set up mocks for camera and media library access
  const mockedImageSize = {
    mockWidth: 1920,
    mockHeight: 1080
  };
  const {
    mockLaunchCameraAsync,
    mockLaunchImageLibraryAsync,
    mockMediaLibraryPermissions,
    mockCameraPermissions,
    grantPermission
  } = mockExpoImagePicker(mockedImageSize);
  mockCameraPermissions.mockImplementation(grantPermission);
  mockMediaLibraryPermissions.mockImplementation(grantPermission);

  // Set up mocks to resize and compress images
  const { mockResize } = mockExpoImageManipulator(mockedImageSize);

  // Set up mocks for saving images to the library
  const { mockSaveToLibraryAsync } = mockExpoMediaLibrary();

  // Now import the component after the mocks are set up
  const { ImageUpload } = require('@/components/report/ImageUpload');
  const initComponent = (props: any) => (
    <ActionSheetProvider>
      <ImageUpload
        onChange={props.onChange}
        value={props.value}
        errorText={props.errorText}
      />
    </ActionSheetProvider>
  );

  beforeEach(() => {
    mockShowActionSheetWithOptions.mockClear();
    mockLaunchCameraAsync.mockClear();
    mockLaunchImageLibraryAsync.mockClear();
    mockCameraPermissions.mockClear();
    mockMediaLibraryPermissions.mockClear();
    mockResize.mockClear();
    mockSaveToLibraryAsync.mockClear();
  });

  test('renders the preview row and "Add Photos" button', async () => {
    // When view the Image Upload component
    render(initComponent({ onChange: jest.fn(), value: [], errorText: null }));

    // show three default images
    expect(
      screen.queryAllByTestId('image-upload-default-preview')
    ).toHaveLength(3);

    // and show the "Add Photos" button
    const addPhotosButton = await screen.findByText('Add Photos');
    expect(addPhotosButton).toBeVisible();

    // When click on the "Add Photos" button
    fireEvent.press(addPhotosButton);

    // Then show the options menu
    expect(mockShowActionSheetWithOptions).toHaveBeenCalled();

    // and correct options are provided
    const actionSheetConfig: ActionSheetOptions = mockShowActionSheetWithOptions
      .mock.calls[0][0] as unknown as ActionSheetOptions;
    expect(actionSheetConfig.options).toEqual([
      'Use Camera',
      'Upload from Library',
      'Cancel'
    ]);

    // When select the "Cancel" option
    const actionSheetCallback: ActionSheetCallback =
      mockShowActionSheetWithOptions.mock
        .calls[0][1] as unknown as ActionSheetCallback;
    actionSheetCallback(expectedMenuOptions.cancel);

    // Then the options menu is closed
    expect(mockShowActionSheetWithOptions).toHaveBeenCalledTimes(1);
    expect(mockLaunchCameraAsync).not.toHaveBeenCalled();
    expect(mockResize).not.toHaveBeenCalled();
  });

  test('opens the camera when selecting Use Camera option', async () => {
    // When view the Image Upload component
    const mockUpdateForm = jest.fn();
    render(
      initComponent({
        onChange: mockUpdateForm,
        value: [],
        errorText: null
      })
    );

    // When click on the "Add Photos" button
    const addPhotosButton = await screen.findByText('Add Photos');
    fireEvent.press(addPhotosButton);

    // When select the "Use Camera" option
    const actionSheetCallback: ActionSheetCallback =
      mockShowActionSheetWithOptions.mock
        .calls[0][1] as unknown as ActionSheetCallback;
    actionSheetCallback(expectedMenuOptions.useCamera);

    // Then show the camera to the user
    await waitFor(() => {
      expect(mockLaunchCameraAsync).toHaveBeenCalledTimes(1);
    });

    // After photo is taken, the image is resized
    await waitFor(() => {
      expect(mockResize).toHaveBeenCalledTimes(1);
    });

    // and added to the form
    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
    });

    // and saved to the library
    await waitFor(() => {
      expect(mockSaveToLibraryAsync).toHaveBeenCalledTimes(1);
    });
  });

  test('opens the photo library when selecting Upload from Library option', async () => {
    // When view the Image Upload component
    const mockUpdateForm = jest.fn();
    render(
      initComponent({ onChange: mockUpdateForm, value: [], errorText: null })
    );

    // When click on the "Add Photos" button
    const addPhotosButton = await screen.findByText('Add Photos');
    fireEvent.press(addPhotosButton);

    // When select the "Upload from Library" option
    const actionSheetCallback: ActionSheetCallback =
      mockShowActionSheetWithOptions.mock
        .calls[0][1] as unknown as ActionSheetCallback;
    actionSheetCallback(expectedMenuOptions.uploadFromLibrary);

    // Then show the camera to the user
    await waitFor(() => {
      expect(mockLaunchImageLibraryAsync).toHaveBeenCalledTimes(1);
    });

    // After image is selected from library, the image is resized
    await waitFor(() => {
      expect(mockResize).toHaveBeenCalledTimes(1);
    });

    // and added to the form
    await waitFor(() => {
      expect(mockUpdateForm).toHaveBeenCalledTimes(1);
    });

    // and it should not be saved to the library (because it was selected from the library)
    await waitFor(() => {
      expect(mockSaveToLibraryAsync).not.toHaveBeenCalled();
    });
  });

  test('renders error text from the form', () => {
    // When view the Image Upload component
    const errorText = 'Form is missing an image';
    render(initComponent({ onChange: jest.fn(), value: [], errorText }));

    // Then show the error text above the preview row
    expect(screen.getByText(errorText)).toBeVisible();
  });

  test('renders images uploaded by the user', () => {
    // When view the Image Upload component
    const image: ImageDetails = {
      uri: 'https://example.com/image.jpg',
      base64: 'base64string'
    };
    render(
      initComponent({
        onChange: jest.fn(),
        value: [image, image],
        errorText: null
      })
    );

    // Then show the two uploaded images
    expect(screen.queryAllByTestId('user-submitted-image-upload')).toHaveLength(
      2
    );

    // and one default image
    expect(screen.queryByTestId('image-upload-default-preview')).toBeVisible();
  });

  test('shows an error if selecting a photo fails', async () => {
    // Mock the image picker to return no valid image
    mockLaunchImageLibraryAsync.mockImplementation(() => {
      return Promise.resolve({
        canceled: false,
        assets: []
      });
    });

    // When view the Image Upload component
    render(initComponent({ onChange: jest.fn(), value: [], errorText: null }));

    // and click on the "Add Photos" button to show options menu
    const addPhotosButton = screen.getByText('Add Photos');
    fireEvent.press(addPhotosButton);

    // When select the "Upload from Library" option
    const actionSheetCallback: ActionSheetCallback =
      mockShowActionSheetWithOptions.mock
        .calls[0][1] as unknown as ActionSheetCallback;
    actionSheetCallback(expectedMenuOptions.uploadFromLibrary);

    // Then an error message is shown when it fails
    await waitFor(() => {
      expect(
        screen.getByText('Failed to upload image. Please try again.')
      ).toBeVisible();
    });
  });
});
