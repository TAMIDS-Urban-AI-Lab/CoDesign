import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react-native';
import { format } from 'date-fns';

import { createMockedReportFormDetails } from '@/mocks/mockReport';
import { Report } from '@/types/Report';
import { mockReactNativeReanimated } from '@/mocks/mockReactNativeReanimated';
import { mockBottomSheet } from '@/mocks/mockBottomSheet';

describe('<ReportDetailsSheet />', () => {
  // Mock third-party libraries
  mockReactNativeReanimated();
  const { mockedCloseBottomSheet } = mockBottomSheet();

  const mockedReport = new Report(createMockedReportFormDetails());

  const {
    ReportDetailsSheet
  } = require('@/components/report/ReportDetailsSheet');

  test('renders expected report details', () => {
    // When rendering the sheet
    render(
      <ReportDetailsSheet
        report={mockedReport}
        afterCloseCallback={jest.fn()}
      />
    );

    // Image from report should be visible
    expect(
      screen.getByTestId('report-details-sheet-header-image')
    ).toBeVisible();
    // All report details should be visible
    expect(screen.getByText(mockedReport.getTitle())).toBeVisible();
    expect(
      screen.getByText(format(mockedReport.getCreatedAt(), 'MMMM dd, yyyy'))
    ).toBeVisible();
    expect(screen.getByText('Details')).toBeVisible();
    expect(screen.getByText(mockedReport.getDescription())).toBeVisible();
  });

  test('the close button closes the sheet', async () => {
    // When rendering the sheet
    render(
      <ReportDetailsSheet
        report={mockedReport}
        afterCloseCallback={jest.fn()}
      />
    );

    // The close button should be visible
    expect(
      screen.getByTestId('report-details-sheet-close-button')
    ).toBeVisible();

    // When the close button is pressed
    const closeButton = await screen.findByTestId(
      'report-details-sheet-close-button'
    );
    fireEvent.press(closeButton);

    // Then the sheet should close
    await waitFor(() => {
      expect(mockedCloseBottomSheet).toHaveBeenCalled();
    });
  });
});
