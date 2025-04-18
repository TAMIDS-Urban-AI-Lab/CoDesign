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
