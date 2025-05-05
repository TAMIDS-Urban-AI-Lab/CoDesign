/**
 * @fileoverview This module provides functionality for retrieving images associated with reports.
 * It exports a function to fetch image data by report ID and includes utilities for
 * converting the server response into strongly-typed ImageDetails objects. The module
 * handles base64 encoded image data and includes proper error handling.
 *
 * @module api/report/getImageById
 */

import { ROUTES, constructQueryString } from '@/constants/api/routes';
import { ApiResponse, ImageDataSuccess } from '@/types/api';
import { ImageDetails } from '@/types/Report';

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
  const query = constructQueryString(ROUTES.REPORT_IMAGE, { id });

  return fetch(query)
    .then((res: Response) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      return res.json();
    })
    .then((res: ApiResponse<ImageDataSuccess>) => {
      const imageDetails = convertToImageDetails(res.data['image_data']);
      return imageDetails;
    })
    .catch(() => {
      throw new Error('An error occurred while fetching the image.');
    });
}
