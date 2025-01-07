import {
  ReportFormDetails,
  ReportType,
  ReportLocationType
} from '@/types/Report';
import { ALBRITTON_BELL_TOWER } from '@/constants/map/Coordinates';

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
  coordinates: ALBRITTON_BELL_TOWER,
  createdAt: new Date()
};

export const DefaultOutdoorReport: ReportFormDetails = {
  id: -1,
  reportType: ReportType.MAINTENANCE,
  reportLocation: ReportLocationType.OUTDOOR,
  title: '',
  description: '',
  reportLocationDetails: {},
  coordinates: ALBRITTON_BELL_TOWER,
  createdAt: new Date()
};
