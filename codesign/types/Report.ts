export enum ReportType {
  'MAINTENANCE' = 'MAINTENANCE',
  'OTHER' = 'OTHER'
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
  id: number;
  reportType: ReportType;
  reportLocation: ReportLocationType;
  title: string;
  description: string;
  geoCoordinates: number[];
  reportLocationDetails: ReportLocationDetails;
  createdAt: Date;
};

export class Report implements ReportFormDetails {
  id: number;
  reportType: ReportType;
  reportLocation: ReportLocationType;
  title: string;
  description: string;
  geoCoordinates: number[];
  reportLocationDetails: ReportLocationDetails;
  createdAt: Date;

  constructor(reportDetails: ReportFormDetails) {
    this.id = reportDetails.id;
    this.reportType = reportDetails.reportType;
    this.reportLocation = reportDetails.reportLocation;
    this.title = reportDetails.title;
    this.description = reportDetails.description;
    this.geoCoordinates = reportDetails.geoCoordinates;
    this.reportLocationDetails = reportDetails.reportLocationDetails;
    this.createdAt = reportDetails.createdAt;
  }

  getId(): number {
    return this.id;
  }

  getReportType(): ReportType {
    return this.reportType;
  }

  getReportLocation(): ReportLocationType {
    return this.reportLocation;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getGeoCoordinates(): number[] {
    return this.geoCoordinates;
  }

  getReportLocationDetails(): ReportLocationDetails {
    return this.reportLocationDetails;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isIndoor(): boolean {
    return this.reportLocation === ReportLocationType.INDOOR;
  }

  isOutdoor(): boolean {
    return this.reportLocation === ReportLocationType.OUTDOOR;
  }

  // May be called only when the report location is indoor
  getBuildingName(): string {
    if (this.reportLocation !== ReportLocationType.INDOOR) {
      throw new Error('Report location is not indoor');
    }

    return this.reportLocationDetails.indoorDetails!.buildingName;
  }

  // May be called only when the report location is indoor
  getFloorNumber(): number | undefined {
    if (this.reportLocation !== ReportLocationType.INDOOR) {
      throw new Error('Report location is not indoor');
    }

    return this.reportLocationDetails.indoorDetails!.floorNumber;
  }
}
