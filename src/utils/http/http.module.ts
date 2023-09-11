import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  ENV_CONFIG,
  EnvironmentModel,
} from 'src/types/enviroment-config.model';

@NgModule({
  imports: [CommonModule],
})
export class HttpModule {
  static forRoot(
    enviroment: EnvironmentModel
  ): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: enviroment,
        },
      ],
    };
  }
}
