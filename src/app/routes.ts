import { Route } from '@angular/router';
import { WeatherComponent } from 'src/scenes/weather/weather.component';

export const ROUTES: Route[] = [
  {
    path: '',
    component: WeatherComponent,
  },
];
