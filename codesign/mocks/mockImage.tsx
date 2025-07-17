/**
 * Mock implementation for image handling
 * Provides utilities for loading and converting test images to base64
 */

import { Asset } from 'expo-asset';

import { getRandomInt } from '@/utils/Math';
import { convertImageToBase64 } from '@/utils/Image';

const DEFAULT_IMAGES = [
  require('@/assets/images/default/corner.png'),
  require('@/assets/images/default/square.png'),
  require('@/assets/images/default/stairs.png')
];

/** Returns a random image from default images as base64 string array */
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
