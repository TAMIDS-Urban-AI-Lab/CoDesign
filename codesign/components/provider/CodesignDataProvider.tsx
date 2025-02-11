import { createContext, useContext, useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import { getReportByBoundary } from '@/api/report/getReportByBoundary';

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

  useEffect(() => {
    // selected location 
    // TODO: make this dynamically get bbox based on screen size
    const loc = {
    west: -96.339152,
    south: 30.600238,
    east: -96.334904,
    north: 30.627126,
    };
    
    getReportByBoundary(loc.west, loc.south, loc.east, loc.north)
    .then((reports: Report[]) => {
      if (reports.length == 0) {
        throw new Error("No reports found at this location");
      }
      setReports(reports);
      setIsLoading(false);
    });
  },[]);

  return (
    <CodesignDataContext.Provider
      value={{ reports, setReports, isLoading, error }}
    >
      {children}
    </CodesignDataContext.Provider>
  );
};
