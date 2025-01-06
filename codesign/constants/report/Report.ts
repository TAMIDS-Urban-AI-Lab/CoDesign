import {
  ReportFormDetails,
  ReportType,
  ReportLocationType
} from '@/types/Report';

export const DefaultIndoorReport: ReportFormDetails = {
  reportType: ReportType.FEEDBACK,
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
  reportType: ReportType.FEEDBACK,
  reportLocation: ReportLocationType.OUTDOOR,
  title: '',
  description: '',
  reportLocationDetails: {}
};
