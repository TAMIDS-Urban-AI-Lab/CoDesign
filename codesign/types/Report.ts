export enum ReportType {
  'FEEDBACK' = 'FEEDBACK'
}

export enum ReportLocationType {
  'INDOOR' = 'INDOOR',
  'OUTDOOR' = 'OUTDOOR'
}

type ReportLocationDetails = {
  indoorDetails?: IndoorDetails;
};

type IndoorDetails = {
  buildingName: string;
  floorNumber: number;
};

export type ReportFormDetails = {
  reportType: ReportType;
  reportLocation: ReportLocationType;
  title: string;
  description: string;
  reportLocationDetails: ReportLocationDetails;
  createdAt?: Date;
};
