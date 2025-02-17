import { Server, Model } from 'miragejs';
import Constants from 'expo-constants';

import { ROUTES } from '@/constants/api/routes';
import { getMockImage } from '@/mocks/Image';
import { reportFactory } from '@/mocks/Report';

declare global {
  interface Window {
    server: Server;
  }
}

export function startMockBackendServer() {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = createMockServer();
}

function createMockServer() {
  return new Server({
    environment: 'development',
    models: {
      report: Model
    },
    factories: {
      report: reportFactory
    },
    seeds(server: Server) {
      server.createList('report', 3);
    },
    routes() {
      this.urlPrefix = Constants.expoConfig?.extra?.baseUrl;

      this.get(ROUTES.REPORT_LOCATION, () => {
        return { data: this.schema.all('report').models };
      });

      this.post(ROUTES.REPORT_LOCATION, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 1000);
        return attrs;
      });

      this.get(ROUTES.REPORT_IMAGE, () => {
        return getMockImage()
          .then((image) => {
            return { data: { image_data: image } };
          })
          .catch(() => {
            return { image_data: [] };
          });
      });
    }
  });
}
