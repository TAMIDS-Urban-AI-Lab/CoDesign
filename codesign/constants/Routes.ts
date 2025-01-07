import { RelativePathString } from 'expo-router';

export const TAB_ROUTES = {
  INDEX: 'index',
  REPORT: 'report',
  PROFILE: 'profile'
};

export const TAB_ROUTE_PATH = {
  [TAB_ROUTES.INDEX]: '/',
  [TAB_ROUTES.REPORT]: '/report',
  [TAB_ROUTES.PROFILE]: '/profile'
} as Record<string, RelativePathString>;
