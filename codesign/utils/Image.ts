import { readAsStringAsync, EncodingType } from 'expo-file-system';

import { ImageDetails } from '@/types/Report';

export const getImageSrc = (
  defaultSrc: any,
  images: ImageDetails[]
): ImageSource => {
  if (!images || images.length === 0) return defaultSrc;
  if (typeof images[0].uri === 'string') {
    return { uri: images[0].uri };
  } else if (typeof images[0].base64 === 'string') {
    return { uri: 'data:image/png;base64,' + images[0].base64 };
  } else {
    if (!images[0].uri) return defaultSrc;
    return images[0].uri;
  }
};

type ImageSource = {
  uri: string;
};

/** Helper function to convert image file to base64 string */
export const convertImageToBase64 = async (fileUri: string) => {
  try {
    const base64Data = await readAsStringAsync(fileUri, {
      encoding: EncodingType.Base64
    });
    return base64Data;
  } catch {
    throw new Error('Error converting image to base 64');
  }
};
