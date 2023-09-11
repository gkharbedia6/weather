import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IWeatherByCity } from 'src/types/weather-by-city.model';
import { IWeather } from 'src/types/weather.model';
import { ModifyDataService } from 'src/utils/helpers/modify-data.service';
import { ModifyWeatherKeysPipe } from 'src/utils/helpers/modify-weather-keys.pipe';

@Component({
  selector: 'weather-description',
  standalone: true,
  imports: [CommonModule, ModifyWeatherKeysPipe],
  template: `
    <ng-container
      *ngIf="{
        weather: weather$ | async,
        locationError: currentLocationError$ | async,
        weatherError: weatherByCityError$ | async
      } as vm"
    >
      <div class="overflow-hidden bg-white w-full h-full ml-5">
        <ng-container *ngIf="vm.weather; else loading">
          <div class="pr-4 py-5  sm:pr-6 flex flex-col justify-start">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Weather information.
            </h3>
          </div>
          <div
            class="border-t border-gray-100"
            *ngFor="let item of vm.weather | keyvalue"
          >
            <dl class="divide-y divide-gray-100 h-8">
              <div class="pr-4 py-1 flex flex-row ">
                <dt class="text-sm font-medium text-gray-900 w-2/3">
                  {{ item.key | modifyWeatherKeys }}
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 w-1/3 sm:mt-0">
                  {{ item.value ?? 'Not Available' }}
                </dd>
              </div>
            </dl>
          </div>
        </ng-container>
        <ng-container *ngIf="vm.weatherError">
          <div class="pr-4 py-5  sm:pr-6 flex flex-col justify-start">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 text-center"
            >
              {{ vm.weatherError }}
            </h3>
          </div>
        </ng-container>
      </div>
      <ng-template #loading>
        <div
          *ngIf="!vm.weatherError && !vm.locationError"
          class="overflow-hidden bg-white w-full h-full ml-5"
        >
          <div class="pr-4 pt-5 pb-3  sm:pr-6 flex flex-col justify-start">
            <h3
              class=" w-[50%]  bg-gray-300 h-3 my-2 leading-6 animate-pulse"
            ></h3>
          </div>
          <div
            class="border-t border-gray-100 h-8"
            *ngFor="let dummyData of loadingDummyData"
          >
            <dl class="divide-y divide-gray-100">
              <div class="pr-4 py-1 flex flex-row ">
                <div
                  class="w-[75%]  bg-gray-300 h-3 my-2 leading-6 animate-pulse"
                ></div>
              </div>
            </dl>
          </div>
        </div>
      </ng-template>
    </ng-container>
  `,
})
export class WeatherDescriptionComponent implements OnInit {
  @Input() weatherByCity$!: Observable<IWeatherByCity | null>;
  @Input() weatherByCityError$!: Observable<string | null>;
  @Input() currentLocationError$!: Observable<string>;

  weather$!: Observable<IWeather | null>;
  loadingDummyData = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private _modifyData: ModifyDataService) {}

  ngOnInit(): void {
    this.weather$ = this._modifyData.modifyWeatherObject$(this.weatherByCity$);
  }
}
