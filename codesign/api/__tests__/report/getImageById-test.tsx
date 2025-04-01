import { mockFetchSuccess, mockFetchError } from '@/mocks/mockFetch';
import { ApiResponse, ImageData } from '@/types/api';
import { getImageById } from '@/api/report/getImageById';
import { ROUTES } from '@/constants/api/routes';

describe('getImageById', () => {
  const testId = 1;

  describe('when the fetch is successful', () => {
    beforeAll(() => {
      const successResponse: ApiResponse<ImageData> = {
        status: 200,
        message: 'Success',
        data: {
          id: testId,
          image_data: ['image1', 'image2']
        }
      };
      global.fetch = mockFetchSuccess(successResponse);
    });
    afterAll(() => {
      jest.resetAllMocks();
    });

    test('should call fetch with the correct URL path', async () => {
      const fetchSpy = jest.spyOn(global, 'fetch');

      const expectedUrl = `${ROUTES.REPORT_IMAGE}?id=${testId}`;
      await getImageById(testId);
      expect(fetchSpy.mock.calls[0][0]).toMatch(expectedUrl);
    });

    test('should return image data in the correct format', async () => {
      const expectedResponse = [
        {
          base64: 'image1'
        },
        {
          base64: 'image2'
        }
      ];
      const actualResponse = await getImageById(testId);

      expect(actualResponse).toEqual(expectedResponse);
    });
  });
  describe('when the fetch fails', () => {
    beforeAll(() => {
      global.fetch = mockFetchError('Fetching image failed');
    });
    afterAll(() => {
      jest.resetAllMocks();
    });
    test('should throw an error', async () => {
      await expect(getImageById(testId)).rejects.toThrow();
    });
  });
});
