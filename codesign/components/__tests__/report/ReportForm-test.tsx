import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react-native';

import { MEMORIAL_STUDENT_CENTER } from '@/constants/map/Coordinates';
import { mockMapbox } from '@/mocks/mockMapbox';
import { mockReactHookForm } from '@/mocks/mockReactHookForm';
import { ReportLocationType } from '@/types/Report';
import { DefaultOutdoorReport } from '@/constants/report/Report';
import { mockExpoRouter } from '@/mocks/mockExpoRouter';
import { TAB_ROUTE_PATH, TAB_ROUTES } from '@/constants/Routes';
import { mockUploadReport } from '@/mocks/api/mockUploadReport';
import { createMockedReportFormDetails } from '@/mocks/mockReport';

describe('<ReportForm />', () => {
  // Mock 3rd party libraries
  const { mockFormState, mockFormData, resetFormToDefault } =
    mockReactHookForm();
  mockMapbox({
    centerCoordinate: MEMORIAL_STUDENT_CENTER
  });
  const { mockedRouterReplace } = mockExpoRouter();
  const { mockedUploadReport } = mockUploadReport();

  // Mock CodesignDataProvider and ModalProvider
  const mockedOpenModal = jest.fn();
  jest.mock('@/components/provider/ModalProvider', () => {
    return {
      useModal: jest.fn(() => {
        return {
          openModal: mockedOpenModal
        };
      })
    };
  });
  jest.mock('@/components/provider/CodesignDataProvider', () => {
    return {
      useCodesignData: jest.fn(() => {
        return {
          reports: [],
          setReports: jest.fn()
        };
      })
    };
  });

  afterEach(() => {
    // Avoid sharing mock state betweeen tests
    jest.clearAllMocks();

    // Reset report form state between tests
    resetFormToDefault();
  });

  const { ReportForm } = require('@/components/report/ReportForm');

  test('should render all form elements', async () => {
    // When Report Form renders
    render(<ReportForm />);

    // Location section should be visible
    await waitFor(() => {
      expect(screen.getByText('Location')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Indoor')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Outdoor')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByTestId('location-preview')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Select Location on Map')).toBeVisible();
    });

    // Indoor option is checked by default
    await waitFor(() => {
      expect(screen.getByTestId('themed-radio-button-Indoor')).toBeChecked();
    });

    // Outdoor option is not checked by default
    await waitFor(() => {
      expect(
        screen.getByTestId('themed-radio-button-Outdoor')
      ).not.toBeChecked();
    });

    // And indoor fields should be visible and marked required
    await waitFor(() => {
      expect(screen.getByText('Building Name*')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Floor Number*')).toBeVisible();
    });

    // Report Details section should be visible
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeVisible();
    });
    await waitFor(() => {
      expect(
        screen.queryAllByTestId('image-upload-default-preview')
      ).toHaveLength(3);
    });
    await waitFor(() => {
      expect(screen.getByText('Add Photos')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Title*')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Description*')).toBeVisible();
    });

    // Reset Form and Submit buttons should be visible
    await waitFor(() => {
      expect(screen.getByText('Reset Form')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeVisible();
    });
  });

  test('form should show validation error messages', async () => {
    // Setup form state to have errors
    const mockedFormErrors = {
      reportLocation: {
        message: 'Location is required',
        type: 'required'
      },
      coordinates: {
        message: 'Coordinates are required',
        type: 'required'
      },
      reportLocationDetails: {
        indoorDetails: {
          buildingName: {
            message: 'Building Name is required',
            type: 'required'
          },
          floorNumber: {
            message: 'Floor Number is required',
            type: 'required'
          }
        }
      },
      images: {
        message: 'Images are required',
        type: 'required'
      },
      title: {
        message: 'Title is required',
        type: 'required'
      },
      description: {
        message: 'Description is required',
        type: 'required'
      }
    };
    mockFormState({ errors: mockedFormErrors });

    // When Report Form renders
    render(<ReportForm />);

    // Then form should show validation error messages
    await waitFor(() => {
      expect(
        screen.getByText(mockedFormErrors.reportLocation.message)
      ).toBeVisible();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          mockedFormErrors.reportLocationDetails.indoorDetails.buildingName
            .message
        )
      ).toBeVisible();
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          mockedFormErrors.reportLocationDetails.indoorDetails.floorNumber
            .message
        )
      ).toBeVisible();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockedFormErrors.coordinates.message)
      ).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText(mockedFormErrors.images.message)).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText(mockedFormErrors.title.message)).toBeVisible();
    });
    await waitFor(() => {
      expect(
        screen.getByText(mockedFormErrors.description.message)
      ).toBeVisible();
    });
  });

  test('form should hide building name and floor number when outdoor radio button is selected', async () => {
    // When Outdoor location is chosen
    mockFormData(DefaultOutdoorReport);

    render(<ReportForm />);

    // Then Indoor fields should not be visible
    await waitFor(() => {
      expect(screen.queryByText('Building Name*')).not.toBeVisible();
    });
    await waitFor(() => {
      expect(screen.queryByText('Floor Number*')).not.toBeVisible();
    });
  });

  test('should reset all form data except location when Reset Form button is clicked', async () => {
    // Report has outdoor location chosen
    mockFormData(
      createMockedReportFormDetails({
        reportLocation: ReportLocationType.OUTDOOR,
        coordinates: MEMORIAL_STUDENT_CENTER,
        reportLocationDetails: {},
        title: 'Test Title',
        description: 'Test Description'
      })
    );
    // When Report Form renders
    render(<ReportForm />);

    // and Reset Form button is clicked
    const resetButton = await screen.findByText('Reset Form');
    fireEvent.press(resetButton);

    // Then outdoor location should be still selected
    await waitFor(() => {
      expect(screen.getByTestId('themed-radio-button-Outdoor')).toBeChecked();
    });

    // But other fields should be reset
    await waitFor(() => {
      expect(
        screen.getByTestId('report-form-description-input')
      ).toHaveTextContent('');
    });
    await waitFor(() => {
      expect(screen.getByTestId('report-form-title-input')).toHaveTextContent(
        ''
      );
    });

    await waitFor(() => {
      expect(
        screen.queryAllByTestId('image-upload-default-preview')
      ).toHaveLength(3);
    });

    // TO DO: Add check for location to be on default
  });

  test('should switch tabs and open modal when submitting report is successful', async () => {
    mockedUploadReport.mockImplementationOnce(() =>
      Promise.resolve({ id: 123 })
    );

    // When Report Form renders
    render(<ReportForm />);

    // and Submit button is clicked and successful submission
    const submitButton = await screen.findByText('Submit');
    fireEvent.press(submitButton);

    // Then router should navigate to map tab
    await waitFor(() => {
      expect(mockedRouterReplace).toHaveBeenCalledWith({
        pathname: TAB_ROUTE_PATH[TAB_ROUTES.INDEX]
      });
    });

    // And open success modal
    await waitFor(() => {
      expect(mockedOpenModal).toHaveBeenCalled();
    });
  });

  test('should show error message when submission fails', async () => {
    mockedUploadReport.mockImplementationOnce(() =>
      Promise.reject(new Error('Submission failed'))
    );

    // When Report Form renders
    render(<ReportForm />);

    // and Submit button is clicked
    const submitButton = await screen.findByText('Submit');
    fireEvent.press(submitButton);

    // When form rerenders
    screen.rerender(<ReportForm />);

    // Then error message should be shown
    await waitFor(() => {
      expect(
        screen.getByText(
          'An error occurred while submitting report. Please try again.'
        )
      ).toBeVisible();
    });
  });
});
