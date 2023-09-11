import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifyWeatherKeys',
  standalone: true,
  pure: true,
})
export class ModifyWeatherKeysPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'city':
        return 'City';
      case 'weatherCondition':
        return 'Weather Condition';
      case 'temperature':
        return 'Temperature';
      case 'feelsLikeTemperature':
        return 'Feels Like Temperature';
      case 'humidity':
        return 'Humidity';
      case 'seaLevel':
        return 'Sea Level';
      case 'windSpeed':
        return 'Wind Speed';
      case 'visibility':
        return 'Visibility';
      default:
        return 'Unknown';
    }
  }
}
