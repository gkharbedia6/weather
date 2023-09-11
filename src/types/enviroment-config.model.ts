import { InjectionToken } from '@angular/core';

export interface EnvironmentModel {
  production: boolean;
  config: {
    apiUrl: string;
    apiKey: string;
  };
}

export const ENV_CONFIG = new InjectionToken<EnvironmentModel>(
  'EnvironmentModel'
);
