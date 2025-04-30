import { render, screen } from '@testing-library/react-native';
import { Text, View } from 'react-native';

import {
  CodesignDataProvider,
  useCodesignData,
  CodesignDataContextType
} from '@/components/provider/CodesignDataProvider';
import { createMockedReportFormDetails } from '@/mocks/mockReport';
import { ReportFormDetails, Report } from '@/types/Report';
import { ApiResponse } from '@/types/api';
import { mockFetchSuccess, mockFetchError } from '@/mocks/mockFetch';

const TestingComponent = () => {
  const { reports, error, isLoading }: CodesignDataContextType =
    useCodesignData();
  return (
    <View>
      <Text>Child Component</Text>
      {isLoading && <Text>Loading</Text>}
      {reports.length && <Text>{JSON.stringify(reports)}</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

describe('<CodesignDataProvider />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when fetching report data succeeds', () => {
    test('it provides report data', async () => {
      // Mock getReportByBoundary to return a successful response after 2 seconds
      jest.useFakeTimers();
      const timeToFetchData = 2000;
      const reportData: ReportFormDetails[] = [
        createMockedReportFormDetails({ id: 111 }),
        createMockedReportFormDetails({ id: 222 }),
        createMockedReportFormDetails({ id: 333 })
      ];
      const successResponse: ApiResponse<ReportFormDetails[]> = {
        status: 200,
        message: 'Success',
        data: reportData
      };
      global.fetch = mockFetchSuccess(successResponse, timeToFetchData);

      // When CodesignDataProvider is rendered
      render(
        <CodesignDataProvider>
          <TestingComponent />
        </CodesignDataProvider>
      );

      // it should immediately render children and a loading state
      expect(screen.getByText('Child Component')).toBeVisible();
      expect(screen.getByText('Loading')).toBeVisible();

      // When fetching the report data succeeds
      jest.advanceTimersByTime(timeToFetchData);

      // then it should render the report data
      const expectedReports = JSON.stringify(
        reportData.map((item) => new Report(item))
      );
      const reports = await screen.findByText(expectedReports);
      expect(reports).toBeVisible();

      // and the loading state should be removed
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });

  describe('when fetching report data fails', () => {
    test('it provides an error', async () => {
      // Mock getReportByBoundary to fail after 2 seconds
      jest.useFakeTimers();
      const timeToFetchData = 2000;
      global.fetch = mockFetchError('backend error message', timeToFetchData);

      // When CodesignDataProvider is rendered
      render(
        <CodesignDataProvider>
          <TestingComponent />
        </CodesignDataProvider>
      );

      // it should immediately render children and a loading state
      expect(screen.getByText('Child Component')).toBeVisible();
      expect(screen.getByText('Loading')).toBeVisible();

      // When fetching the report data fails
      jest.advanceTimersByTime(timeToFetchData);

      // then it should render the correct error message
      const errorText = await screen.findByText(
        'An error occurred while fetching reports.'
      );
      expect(errorText).toBeVisible();

      // and the loading state should be removed
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });
});
