import {
  ReportFormDetails,
  ReportType,
  ReportLocationType
} from '@/types/Report';

export const DefaultIndoorReport: ReportFormDetails = {
  id: -1,
  reportType: ReportType.MAINTENANCE,
  reportLocation: ReportLocationType.INDOOR,
  title: '',
  description: '',
  reportLocationDetails: {
    indoorDetails: {
      buildingName: '',
      floorNumber: 1
    }
  },
  geoCoordinates: [],
  createdAt: new Date()
};

export const DefaultOutdoorReport: ReportFormDetails = {
  id: -1,
  reportType: ReportType.MAINTENANCE,
  reportLocation: ReportLocationType.OUTDOOR,
  title: '',
  description: '',
  reportLocationDetails: {},
  geoCoordinates: [],
  createdAt: new Date()
};
