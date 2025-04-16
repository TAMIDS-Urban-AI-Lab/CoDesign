import { render, screen, waitFor } from '@testing-library/react-native';

import { CodesignDataProvider } from '@/components/provider/CodesignDataProvider';
import { ModalProvider } from '@/components/provider/ModalProvider';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';
import { mockGetReportByBoundarySuccess } from '@/mocks/api/mockGetReportByBoundary';
import { mockMapbox } from '@/mocks/mockMapbox';
import { mockReactHookForm } from '@/mocks/mockReactHookForm';
import { createMockedReportFormDetails } from '@/mocks/mockReport';

describe('ReportForm', () => {
  // Mock 3rd party libraries
  mockReactHookForm();
  mockMapbox({
    centerCoordinate: ALBRITTON_BELL_TOWER
  });

  // Mock api call to fetch reports in the CodesignDataProvider
  const reportData = [
    createMockedReportFormDetails({ id: 1 }),
    createMockedReportFormDetails({ id: 2 }),
    createMockedReportFormDetails({ id: 3 })
  ];
  mockGetReportByBoundarySuccess({ reportData });

  // Avoid sharing mock state betweeen tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  const { ReportForm } = require('@/components/report/ReportForm');

  // ReportForm uses context from CodesignDataProvider and ModalProvider
  function TestContext({ children }: { children: React.ReactNode }) {
    return (
      <CodesignDataProvider>
        <ModalProvider>{children}</ModalProvider>
      </CodesignDataProvider>
    );
  }

  test('should render all form elements', async () => {
    // When Report Form renders
    render(
      <TestContext>
        <ReportForm />
      </TestContext>
    );

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
      expect(screen.getByText('Tap to select location')).toBeVisible();
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
      expect(screen.getByText('Report Details')).toBeVisible();
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
});
