import { ImageDetails } from '@/types/Report';
import { getImageSrc } from '@/utils/Image';

describe('getImageSrc()', () => {
  const DEFAULT_SRC = { uri: 'default_image.png' };

  test('returns default image source when no images are provided', () => {
    const emptyImages: ImageDetails[] = [];
    expect(getImageSrc(DEFAULT_SRC, emptyImages)).toEqual(DEFAULT_SRC);
  });

  test('returns valid URI', () => {
    const mockedImageWithUri = { uri: 'image.png' };
    const images: ImageDetails[] = [mockedImageWithUri];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual(mockedImageWithUri);
  });

  test('formats uri when image only has valid base64', () => {
    const mockedImageWithBase64 = { base64: 'base64_string' };
    const images: ImageDetails[] = [mockedImageWithBase64];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual({
      uri: `data:image/png;base64,${mockedImageWithBase64.base64}`
    });
  });

  test('extracts uri when image uri incorrectly stores an object', () => {
    // this occurs when using getMockImage() to load images from assets/
    const nestedUri = { uri: 'mocked_image.png' };
    const images = [{ uri: nestedUri }];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual(nestedUri);
  });

  test('returns default image when invalid uri is provided', () => {
    const invalidImageUri = { uri: null, base64: null };
    const images = [invalidImageUri];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual(DEFAULT_SRC);
  });

  test('returns only image source when both uri and base64 are provided', () => {
    const images: ImageDetails[] = [
      { uri: 'image.png', base64: 'base64_string' }
    ];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual({ uri: 'image.png' });
  });

  test('returns only the first image source when multiple images are provided', () => {
    const images: ImageDetails[] = [
      { uri: 'image1.png' },
      { uri: 'image2.png' },
      { base64: 'base64_string' }
    ];
    const result = getImageSrc(DEFAULT_SRC, images);
    expect(result).toEqual({ uri: 'image1.png' });
  });
});
