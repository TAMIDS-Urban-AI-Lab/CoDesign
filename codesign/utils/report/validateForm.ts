import { Coordinates, ImageDetails } from '@/types/Report';
import { IMAGE_UPLOAD_LIMIT } from '@/components/report/ImageUpload';
import { ReportLocationType } from '@/types/Report';
import { areCoordinatesEqual } from '../Equality';
import { DefaultIndoorReport } from '@/constants/report/Report';

export const VALIDATION_RULES = {
  reportLocation: {
    required: 'Floor Number is required',
    validate: (value: ReportLocationType) => {
      return validateLocationType(value);
    }
  },
  coordinates: {
    validate: (value: Coordinates) => {
      return validateCoordinates(value);
    }
  },
  buildingName: {
    required: 'Building Name is required'
  },
  floorNumber: {
    validate: (value: number) => {
      return validateFloorNumber(value);
    }
  },
  images: {
    validate: (value: ImageDetails[]) => {
      return validateImages(value);
    }
  },
  title: {
    required: 'Title is required'
  },
  description: {
    required: 'Description is required'
  }
};

function validateLocationType(value: ReportLocationType) {
  if (
    value !== ReportLocationType.INDOOR &&
    value !== ReportLocationType.OUTDOOR
  ) {
    return 'Location must be Indoor or Outdoor';
  }
  return true;
}

function validateFloorNumber(value: string | number) {
  if (!value) return 'Floor Number is required'; // handle null, undefined, empty string
  const num = typeof value === 'string' ? Number(value) : value;
  if (isNaN(num)) return 'Floor Number must be a number';
  if (num < 1) return 'Floor Number must be greater than 0';
  if (!Number.isInteger(num)) {
    return 'Floor Number must be a whole number';
  }
  return true;
}

function validateCoordinates(coords: Coordinates) {
  const isDefaultLocation = areCoordinatesEqual(
    coords,
    DefaultIndoorReport.coordinates
  );
  if (!coords || isDefaultLocation) {
    return 'Please choose a location on map';
  }
  if (coords[0] < -180 || coords[0] > 180) {
    return 'Longitude must be between -180 and 180';
  }
  if (coords[1] < -90 || coords[1] > 90) {
    return 'Latitude must be between -90 and 90';
  }
  return true;
}

function validateImages(images: ImageDetails[]) {
  if (images.length === 0) {
    return 'At least one image is required';
  }
  if (images.length > IMAGE_UPLOAD_LIMIT) {
    return `Maximum of ${IMAGE_UPLOAD_LIMIT} images can be uploaded`;
  }
  return true;
}
