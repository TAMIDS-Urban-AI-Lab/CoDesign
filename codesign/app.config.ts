import { ExpoConfig, ConfigContext } from 'expo/config';

// Add dynamic values such as env variables to static app.json config file
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'codesign',
  slug: 'codesign',
  extra: {
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    baseUrl: process.env.BASE_URL ?? 'http://localhost:5000'
  }
});
