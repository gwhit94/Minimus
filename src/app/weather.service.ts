import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root';
})
export class WeatherService {
  constructor(
    public http: HttpClient,
  ) { }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string>{
    const dataSub = new Subject<string>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(data) =>{
        dataSub.next(data['weather']);
      }, (err) =>{
        console.log(err);
      });
      return dataSub;
    }


  getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any>{
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<any>{
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(data) =>{
        dataSub.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const tempSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        tempSubject.next(Math.round(Number(weather.main.temp)));
      });
    return tempSubject;
  }

  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const humSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        console.log(weather)
        humSubject.next(weather.main.humidity);
      });
    return humSubject;
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const speedSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        speedSubject.next(Math.round(Number(weather.wind.speed)));
      });
    return speedSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        max = weather.list[0].main.temp;
        weather.list.forEach(value) =>{
          if (max < value.main.temp){
            max = value.main.temp;
          }
        }
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>{
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        min = weather.list[0].main.temp;
        weather.list.forEach(value) =>{
          if (min > value.main.temp){
            min = value.main.temp;
          }
        }
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>{
    const dataSubject = new Subject<Array<any>>();
    this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`)
      .subscribe(weather: any) =>{
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }

}
