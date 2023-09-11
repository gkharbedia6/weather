import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CurrentLocationState } from 'src/data-access/state/current-location.state';
import { WeatherState } from 'src/data-access/state/weather.state';
import { LocationFormComponent } from 'src/features/location-form/location-form.component';
import { WeatherDescriptionComponent } from 'src/features/weather-description/weather-description.component';
import { ICityByCoordinates } from 'src/types/city-by-location.model';
import { IWeatherByCity } from 'src/types/weather-by-city.model';
import { LaoderService } from 'src/utils/loader/loader.service';

@Component({
  selector: 'location',
  standalone: true,
  imports: [CommonModule, LocationFormComponent, WeatherDescriptionComponent],
  template: `
    <div class="w-full h-screen p-20 bg-gray-50">
      <div
        class="w-[75%] h-[70%] bg-white shadow-md  m-auto -auto mt-28 p-14 sm:w-[60%] flex justify-start flex-row"
      >
        <ng-container
          *ngIf="{
            location: currentLocation$ | async,
            locationError: currentLocationError$ | async
          } as vm"
        >
          <section
            class="border-r border-gray-200 w-1/2 h-full flex flex-col justify-start pb-5 pr-5"
          >
            <div class="flex items-start mb-2">
              <ng-container *ngIf="vm.location; else loading">
                <h1
                  class="py-5 text-base font-semibold leading-6 text-gray-900"
                >
                  Your current location is:
                  <strong>{{ vm.location.name }}</strong>
                </h1>
              </ng-container>
              <ng-container *ngIf="vm.locationError">
                <h1
                  class="py-5 text-base font-semibold leading-6 text-gray-900"
                >
                  {{ vm.locationError }}
                </h1>
              </ng-container>

              <ng-template #loading>
                <h1
                  *ngIf="!vm.locationError"
                  class="relative py-5  w-fit text-base font-semibold leading-6 text-gray-900"
                >
                  Calculating current location:
                  <div class="loader-container"></div>
                </h1>
              </ng-template>
            </div>

            <location-form
              [isLoading]="isLoading$ | async"
              (formSubmitClicked)="getWeatherByCity($event)"
            ></location-form>
          </section>
        </ng-container>
        <section class="w-1/2">
          <weather-description
            [weatherByCity$]="weatherByCity$"
            [currentLocationError$]="currentLocationError$"
            [weatherByCityError$]="weatherByCityError$"
          ></weather-description>
        </section>
      </div>
    </div>
  `,
})
export class WeatherComponent implements OnInit {
  currentLocation$!: Observable<ICityByCoordinates>;
  weatherByCity$!: Observable<IWeatherByCity | null>;
  isLoading$!: Observable<boolean>;

  currentLocationError$!: Observable<string>;
  weatherByCityError$!: Observable<string | null>;

  constructor(
    private _currentLocationState: CurrentLocationState,
    private _weatherState: WeatherState,
    private _loader: LaoderService
  ) {
    this.isLoading$ = this._loader.getIsLoading();
  }

  ngOnInit(): void {
    this.currentLocation$ = this._currentLocationState.getCurrentLocation();
    this.weatherByCity$ = this._weatherState.getWeatherByCity();
    this.currentLocationError$ =
      this._currentLocationState.getCurrentLocationError();
    this.weatherByCityError$ = this._weatherState.getWeatherByCityError();
    this._currentLocationState.getLocation();
  }

  getWeatherByCity(city: string) {
    this.weatherByCity$ = this._weatherState.getWeatherByCity();
    this._weatherState.fetchWeatherByCity(city);
  }
}
