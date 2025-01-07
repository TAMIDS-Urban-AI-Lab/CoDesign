import AsyncStorage from '@react-native-async-storage/async-storage';
import { Report } from '@/types/Report';

export async function setReportsLocal(reports: Report[] = []) {
  try {
    await AsyncStorage.setItem('reports', JSON.stringify(reports));
  } catch {
    console.error('Error initializing reports to AsyncStorage');
  }
}

export async function getReportsLocal(): Promise<Report[]> {
  try {
    const storedReports = await AsyncStorage.getItem('reports');
    const rawReports = JSON.parse(storedReports || '[]');
    // map raw reports to Report class
    const reports = rawReports.map((report) => new Report(report));
    return reports;
  } catch {
    console.error('Error getting reports from AsyncStorage');
    return [];
  }
}
