import {
  ReportFormDetails,
  ReportType,
  ReportLocationType
} from '@/types/Report';

export const DefaultIndoorReport: ReportFormDetails = {
  reportType: ReportType.MAINTENANCE,
  reportLocation: ReportLocationType.INDOOR,
  title: '',
  description: '',
  reportLocationDetails: {
    indoorDetails: {
      buildingName: '',
      floorNumber: 1
    }
  }
};

export const DefaultOutdoorReport: ReportFormDetails = {
  reportType: ReportType.MAINTENANCE,
  reportLocation: ReportLocationType.OUTDOOR,
  title: '',
  description: '',
  reportLocationDetails: {}
};
