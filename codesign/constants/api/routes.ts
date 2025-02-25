import Constants from 'expo-constants';

export function constructQueryString(
  route: string,
  queryParams?: Record<any, any>
) {
  const params = new URLSearchParams(queryParams);
  const paramString = params.toString() ? `?${params.toString()}` : '';
  const baseURL: string = Constants.expoConfig?.extra?.baseUrl;
  return `${baseURL}${route}${paramString}`;
}

export const ROUTES = {
  REPORT_IMAGE: '/get_image',
  REPORT_LOCATION: '/locations'
};
