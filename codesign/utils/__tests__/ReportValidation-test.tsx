import { VALIDATION_RULES } from '@/utils/ReportValidation';
import { DefaultIndoorReport } from '@/constants/report/Report';
import {
  ALBRITTON_BELL_TOWER,
  LONGITUDE_BOUNDS,
  MEMORIAL_STUDENT_CENTER,
  SBISA_DINING_HALL,
  LATITUDE_BOUNDS
} from '@/constants/map/Coordinates';
import { ImageDetails } from '@/types/Report';

describe('ReportValidation', () => {
  test('title should be required', () => {
    expect(VALIDATION_RULES.title.required).toBeTruthy();
  });

  test('description should be required', () => {
    expect(VALIDATION_RULES.description.required).toBeTruthy();
  });

  test('buildingName should be required', () => {
    expect(VALIDATION_RULES.buildingName.required).toBeTruthy();
  });

  test('floorNumber should be a whole number greater than zero', () => {
    expect(VALIDATION_RULES.floorNumber.validate).toBeTruthy();

    const { validate } = VALIDATION_RULES.floorNumber;

    // Empty values should fail
    expect(validate('')).toBe('Floor Number is required');
    expect(validate(0)).toBe('Floor Number is required');
    // Float values should fail
    expect(validate(1.5)).toBe('Floor Number must be a whole number');
    expect(validate('1.5')).toBe('Floor Number must be a whole number');
    // Negative values should fail
    expect(validate('-1')).toBe('Floor Number must be greater than 0');
    expect(validate(-1)).toBe('Floor Number must be greater than 0');

    expect(validate(1)).toBe(true);
    expect(validate(25)).toBe(true);
    expect(validate('1')).toBe(true);
    expect(validate('100')).toBe(true);
  });

  test('reportLocation should be a valid ReportLocationType', () => {
    expect(VALIDATION_RULES.reportLocation.validate).toBeTruthy();

    const { validate } = VALIDATION_RULES.reportLocation;
    // Invalid values should fail
    expect(validate('invalid' as any)).toBe(
      'Location must be Indoor or Outdoor'
    );
    expect(validate('' as any)).toBe('Location must be Indoor or Outdoor');
    expect(validate('INDOOR' as any)).toBe(true);
    expect(validate('OUTDOOR' as any)).toBe(true);
  });

  test('coordinates should be different from default location and in the correct coordinate range', () => {
    expect(VALIDATION_RULES.coordinates.validate).toBeTruthy();
    const { validate } = VALIDATION_RULES.coordinates;

    // Default coordinates should fail
    expect(validate(DefaultIndoorReport.coordinates)).toBe(
      'Please choose a location on map'
    );
    expect(validate(ALBRITTON_BELL_TOWER)).toBe(
      'Please choose a location on map'
    );

    const [validLongitude, validLatitude] = SBISA_DINING_HALL;
    const [pastMinLongitude, pastMaxLongitude] = [-181, 181];
    const [pastMinLatitude, pastMaxLatitude] = [-91, 91];

    // Invalid longitude should fail
    expect(validate([pastMinLongitude, validLatitude])).toBe(
      'Longitude must be between -180 and 180'
    );
    expect(validate([pastMaxLongitude, validLatitude])).toBe(
      'Longitude must be between -180 and 180'
    );

    // Invalid latitude should fail
    expect(validate([validLongitude, pastMinLatitude])).toBe(
      'Latitude must be between -90 and 90'
    );
    expect(validate([validLongitude, pastMaxLatitude])).toBe(
      'Latitude must be between -90 and 90'
    );

    // Valid coordinates should pass
    expect(validate(SBISA_DINING_HALL)).toBe(true);
    expect(validate(MEMORIAL_STUDENT_CENTER)).toBe(true);
    expect(validate([LONGITUDE_BOUNDS.MIN, LATITUDE_BOUNDS.MIN])).toBe(true);
    expect(validate([LONGITUDE_BOUNDS.MAX, LATITUDE_BOUNDS.MAX])).toBe(true);
  });

  test('between 1 and 3 images are required', () => {
    expect(VALIDATION_RULES.coordinates.validate).toBeTruthy();
    const { validate } = VALIDATION_RULES.images;

    // No images should fail
    expect(validate([])).toBe('At least one image is required');

    // More than 3 images should fail
    const mockedImage: ImageDetails = {
      uri: 'mockedUri',
      base64: 'mockedBase64'
    };
    expect(validate(new Array(4).fill(mockedImage))).toBe(
      'Maximum of 3 images can be uploaded'
    );
    // Valid number of images should pass
    expect(validate(new Array(1).fill(mockedImage))).toBe(true);
    expect(validate(new Array(2).fill(mockedImage))).toBe(true);
    expect(validate(new Array(3).fill(mockedImage))).toBe(true);
  });
});
