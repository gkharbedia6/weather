import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HttpModule } from './utils/http/http.module';
import { environment } from './enviroment';
import { ROUTES } from './app/routes';
import { LoaderInterceptor } from './utils/loader/loader.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      HttpModule.forRoot(environment),
      RouterModule.forRoot(ROUTES)
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
}).catch((err) => console.log(err));
