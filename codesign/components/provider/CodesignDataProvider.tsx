import { createContext, useContext, useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import {
  setReportsLocal,
  getReportsLocal
} from '@/utils/report/saveReportLocal';
import { createReportMockData } from '@/utils/report/createReportMockData';

type CodesignDataContextType = {
  reports: Report[];
  setReports: (reports: Report[]) => void;
  isLoading: boolean;
  error: string | null;
};

const CodesignDataContext = createContext<CodesignDataContextType | undefined>(
  undefined
);

// Custom hook to access context
export const useCodesignData = () => {
  const context = useContext(CodesignDataContext);
  if (!context) {
    throw new Error('useData must be used within a CodesignDataProvider');
  }
  return context;
};

export const CodesignDataProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reports on component mount
  useEffect(() => {
    // This is where a GET request would be made to fetch reports
    // for now, we will just initialize the reports locally from AsyncStorage or use mock data
    getReportsLocal()
      .then((reports: Report[]) => {
        if (reports.length === 0) {
          throw new Error(
            'No reports from AsyncStorage so initializing with mock data'
          );
        }
        setReports(reports);
        setIsLoading(false);
      })
      .catch(() => {
        const REPORT_DATA: Report[] = [
          createReportMockData(),
          createReportMockData(),
          createReportMockData()
        ];
        setReportsLocal(REPORT_DATA)
          .then(() => {
            setReports(REPORT_DATA);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
          });
      });
  }, []);

  // sync reports with AsyncStorage
  useEffect(() => {
    setReportsLocal(reports);
  }, [reports]);

  return (
    <CodesignDataContext.Provider
      value={{ reports, setReports, isLoading, error }}
    >
      {children}
    </CodesignDataContext.Provider>
  );
};
