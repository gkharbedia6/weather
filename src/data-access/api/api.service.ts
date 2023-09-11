import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

import { IWeatherByCity } from 'src/types/weather-by-city.model';
import { ICityByCoordinates } from 'src/types/city-by-location.model';
import {
  ENV_CONFIG,
  EnvironmentModel,
} from 'src/types/enviroment-config.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _apiUrl = '';
  private _apiKey = '';

  constructor(
    private _http: HttpClient,
    @Inject(ENV_CONFIG) private _environment: EnvironmentModel
  ) {
    this._apiUrl = _environment.config?.apiUrl;
    this._apiKey = _environment.config?.apiKey;
  }

  fetchWeatherByCity(city: string): Observable<IWeatherByCity> {
    return this._http.get<IWeatherByCity>(
      `${this._apiUrl}data/2.5/weather?q=${city}&appid=${this._apiKey}`
    );
  }

  fetchCityByCoordinates(
    lat: number,
    lon: number
  ): Observable<ICityByCoordinates[]> {
    return this._http.get<ICityByCoordinates[]>(
      `${this._apiUrl}geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this._apiKey}`
    );
  }
}
