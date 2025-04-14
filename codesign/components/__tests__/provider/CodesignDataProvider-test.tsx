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
  const { reports, error }: CodesignDataContextType = useCodesignData();
  return (
    <View>
      <Text>Child Component</Text>
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
      global.fetch = mockFetchSuccess(successResponse);

      render(
        <CodesignDataProvider>
          <TestingComponent />
        </CodesignDataProvider>
      );

      const expectedReports = JSON.stringify(
        reportData.map((item) => new Report(item))
      );

      const childComponent = await screen.findByText('Child Component');
      const reports = await screen.findByText(expectedReports);

      expect(childComponent).toBeVisible();
      expect(reports).toBeVisible();
    });
  });

  describe('when fetching report data fails', () => {
    test('it provides an error', async () => {
      global.fetch = mockFetchError();
      render(
        <CodesignDataProvider>
          <TestingComponent />
        </CodesignDataProvider>
      );

      const childComponent = await screen.findByText('Child Component');
      const errorText = await screen.findByText(
        'An error occurred while fetching reports.'
      );

      expect(childComponent).toBeVisible();
      expect(errorText).toBeVisible();
    });
  });
});
