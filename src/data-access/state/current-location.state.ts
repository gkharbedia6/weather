import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ICityByCoordinates } from 'src/types/city-by-location.model';
import { WeatherState } from './weather.state';
import { LaoderService } from 'src/utils/loader/loader.service';

@Injectable({ providedIn: 'root' })
export class CurrentLocationState {
  private _currentLocation$ = new Subject<ICityByCoordinates>();
  private _currentLocationError$ = new Subject<string>();

  constructor(
    private _api: ApiService,
    private _weatherState: WeatherState,
    private _loader: LaoderService
  ) {}

  public getCurrentLocation(): Observable<ICityByCoordinates> {
    return this._currentLocation$.asObservable();
  }

  public getCurrentLocationError(): Observable<string> {
    return this._currentLocationError$.asObservable();
  }

  getLocation(): void {
    if ('geolocation' in navigator) {
      this._loader.startLoading();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this._api
            .fetchCityByCoordinates(latitude, longitude)
            .subscribe((cities) => {
              this._currentLocation$.next(cities[0]);
              this._weatherState.fetchWeatherByCity(cities[0].name);
            });
        },
        (error) => {
          console.error('Location usage is not allowed:', error);
          alert('Location usage is not allowed by user.');
          this._loader.stopLoading();
          this._currentLocationError$.next('Location denied.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  }
}
