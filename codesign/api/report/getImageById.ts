import { ImageDetails } from '@/types/Report';
import axios from 'axios';
import Constants from 'expo-constants';

/**
 * Convert json response to ImageDetails type
 * @param data
 * @returns
 */
const convertToImageDetails = (imageData: any[]): ImageDetails[] => {
  return imageData.map((item) => {
    const image_data: ImageDetails = {
      base64: item
    };
    return image_data;
  });
};

/**
 * Get image by id
 * @param id: report id
 * @returns
 */
export async function getImageById(id: number) {
  try {
    const query = `${Constants.expoConfig?.extra?.baseUrl ?? ''}/get_image?id=${id}`;
    const response = await axios.get<object>(query);
    return convertToImageDetails(response.data['image_data']);
  } catch {
    return [];
  }
}
