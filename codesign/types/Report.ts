export enum ReportType {
  'MAINTENANCE' = 'MAINTENANCE',
  'OTHER' = 'OTHER'
}

export enum ReportLocationType {
  'INDOOR' = 'INDOOR',
  'OUTDOOR' = 'OUTDOOR'
}

export type Coordinates = [number, number];

export type ReportLocationDetails = {
  indoorDetails?: IndoorDetails;
};

type IndoorDetails = {
  buildingName: string;
  floorNumber: number;
};

export type ImageDetails = {
  uri: string; // path to file on device
  base64: string; // base64 encoded image data
};

export type ReportFormDetails = {
  // Fields created by the backend
  id: number;
  createdAt: Date;
  // Fields defined by user input
  reportType: ReportType;
  reportLocation: ReportLocationType;
  reportLocationDetails: ReportLocationDetails;
  coordinates: Coordinates;
  images: ImageDetails[];
  title: string;
  description: string;
};

export class Report implements ReportFormDetails {
  id: number;
  reportType: ReportType;
  reportLocation: ReportLocationType;
  title: string;
  description: string;
  coordinates: Coordinates;
  reportLocationDetails: ReportLocationDetails;
  createdAt: Date;
  images: ImageDetails[];

  constructor(reportDetails: ReportFormDetails) {
    this.id = reportDetails.id;
    this.reportType = reportDetails.reportType;
    this.reportLocation = reportDetails.reportLocation;
    this.title = reportDetails.title;
    this.description = reportDetails.description;
    this.coordinates = reportDetails.coordinates;
    this.reportLocationDetails = reportDetails.reportLocationDetails;
    this.createdAt = reportDetails.createdAt;
    this.images = reportDetails.images;
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

  getCoordinates(): number[] {
    return this.coordinates;
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

  getImages(): ImageDetails[] {
    return this.images;
  }
}
