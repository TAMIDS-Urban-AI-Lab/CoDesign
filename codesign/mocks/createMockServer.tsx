/**
 * Mock backend server implementation using MirageJS
 * Provides API endpoints for reports and images with test data
 */

import { Server, Model } from 'miragejs';
import Constants from 'expo-constants';

import { ROUTES } from '@/constants/api/routes';
import { getMockImage } from '@/mocks/mockImage';
import { reportFactory } from '@/mocks/mockReport';
import { ReportFormDetails } from '@/types/Report';

declare global {
  interface Window {
    server: Server;
  }
}

/** Starts or restarts the mock backend server */
export function startMockBackendServer() {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = createMockServer();
}

/** Creates a new mock server instance with models, factories, and routes */
function createMockServer() {
  return new Server({
    environment: 'development',
    models: {
      report: Model
    },
    factories: {
      report: reportFactory
    },
    /** Seeds initial test data */
    seeds(server: Server) {
      server.createList('report', 3);
    },
    routes() {
      this.urlPrefix = Constants.expoConfig?.extra?.baseUrl;

      // GET reports endpoint
      this.get(ROUTES.REPORT_LOCATION, () => {
        return JSON.stringify({ data: this.schema.all('report').models });
      });

      // POST report endpoint
      this.post(ROUTES.REPORT_LOCATION, (schema, request) => {
        const report: ReportFormDetails = JSON.parse(request.requestBody)[0];
        report.id = Math.floor(Math.random() * 1000);
        report.createdAt = new Date();
        return JSON.stringify({ data: report });
      });

      // GET report image endpoint
      this.get(ROUTES.REPORT_IMAGE, () => {
        return getMockImage()
          .then((image) => {
            return JSON.stringify({ data: { image_data: image } });
          })
          .catch(() => {
            return JSON.stringify({ data: { image_data: [] } });
          });
      });
    }
  });
}
