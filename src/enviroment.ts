import { EnvironmentModel } from './types/enviroment-config.model';

export const environment: EnvironmentModel = {
  production: false,
  config: {
    apiUrl: 'https://api.openweathermap.org/',
    apiKey: '81b37581947f2ac10d4ccd024a8af240',
  },
};
