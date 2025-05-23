import { ExpoConfig, ConfigContext } from 'expo/config';

// Add dynamic values such as env variables to static app.json config file
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'CoDesign',
  slug: 'codesign',
  extra: {
    ...config.extra,
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    baseUrl: process.env.BASE_URL ?? 'http://localhost:5000',
    useMirage: process.env.USE_MIRAGE === 'true'
  }
});
