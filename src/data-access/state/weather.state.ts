import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  of,
  throwError,
} from 'rxjs';

import { IWeatherByCity } from 'src/types/weather-by-city.model';
import { ApiService } from '../api/api.service';
import { LaoderService } from 'src/utils/loader/loader.service';

@Injectable({ providedIn: 'root' })
export class WeatherState {
  private _weatherByCity$ = new BehaviorSubject<IWeatherByCity | null>(null);
  private _weatherByCityError$ = new Subject<string | null>();

  constructor(private _api: ApiService, private _loader: LaoderService) {}

  public getWeatherByCity(): Observable<IWeatherByCity | null> {
    return this._weatherByCity$.asObservable();
  }

  public getWeatherByCityError(): Observable<string | null> {
    return this._weatherByCityError$.asObservable();
  }

  public fetchWeatherByCity(city: string): void {
    this._weatherByCity$.next(null);
    this._loader.startLoading();
    this._api
      .fetchWeatherByCity(city)
      .pipe(
        catchError((err) => {
          this._weatherByCityError$.next('Oops! No data found.');
          this._weatherByCity$.next(null);
          return throwError(() => of(err));
        })
      )
      .subscribe((weather) => {
        this._weatherByCityError$.next(null);
        this._weatherByCity$.next(weather);
      });
  }
}
