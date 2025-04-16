import { readAsStringAsync, EncodingType } from 'expo-file-system';
import { Asset } from 'expo-asset';

import { getRandomInt } from '@/utils/Math';

const DEFAULT_IMAGES = [
  require('@/assets/images/default/corner.png'),
  require('@/assets/images/default/square.png'),
  require('@/assets/images/default/stairs.png')
];

export async function getMockImage() {
  try {
    const randomIdx = getRandomInt(0, DEFAULT_IMAGES.length);
    const randomAsset = Asset.fromModule(DEFAULT_IMAGES[randomIdx]);
    await randomAsset.downloadAsync();
    const image = await convertImageToBase64(randomAsset.localUri || '');
    return [image];
  } catch {
    throw new Error('Error getting mock image');
  }
}

const convertImageToBase64 = async (fileUri: string) => {
  try {
    const base64Data = await readAsStringAsync(fileUri, {
      encoding: EncodingType.Base64
    });
    return base64Data;
  } catch {
    throw new Error('Error converting image to base 64');
  }
};
