import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IWeatherByCity } from 'src/types/weather-by-city.model';
import { IWeather } from 'src/types/weather.model';

@Injectable({ providedIn: 'root' })
export class ModifyDataService {
  modifyWeatherObject$(
    weatherByCity$: Observable<IWeatherByCity | null>
  ): Observable<IWeather | null> {
    const weather = weatherByCity$.pipe(
      map((weatherByCity) => {
        if (!weatherByCity) return null;
        return {
          city: weatherByCity?.name,
          weatherCondition: weatherByCity?.weather[0].main,
          temperature: weatherByCity?.main.temp,
          feelsLikeTemperature: weatherByCity?.main.feels_like,
          humidity: weatherByCity?.main.humidity,
          seaLevel: weatherByCity?.main.sea_level,
          windSpeed: weatherByCity?.wind.speed,
          visibility: weatherByCity?.visibility,
        } as IWeather;
      })
    );
    return weather;
  }

  capitalizeWords(inputString: string) {
    const words = inputString.split(' ');
    const capitalizedWords = words.map((word) => {
      if (word.trim().length === 0) {
        return '';
      }
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });

    const resultString = capitalizedWords.join(' ');

    return resultString;
  }
}
