import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  //subscription var declerations
  humidity: number;
  windSpeed: number;
  temperature: number;
  weather: string;
  state: string;
  city: string;
  today: string;

  //day1
  day1Name:string;
  day1State: string;
  day1Temp: number;
  //day2
  day2Name:string;
  day2State: string;
  day2Temp: number;
  //day3
  day3Name:string;
  day3State: string;
  day3Temp: number;
  //day4
  day4Name:string;
  day4State: string;
  day4Temp: number;
  //day5
  day5Name:string;
  day5State: string;
  day5Temp: number;

  //subscription declarations
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  constructor(
    public activateRouter: ActivatedRoute,
    public weatherService: WeatherService,
  ) {}

  ngOnInit() {
    const todaysNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    this.today = days[todaysNumberInWeek];
    this.activateRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.sub1 = this.weatherService.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.sub2 = this.weatherService.getCurrentTemp(this.city).subscribe((temperature) => this.temperature = temperature);
      this.sub3 = this.weatherService.getCurrentHum(this.city).subscribe((humidity) => this.humidity = humidity);
      this.sub4 = this.weatherService.getCurrentWind(this.city).subscribe((windSpeed) => this.wind = windSpeed);
      this.sub5 = this.weatherService.getForecast(this.city).subscribe((data:any) => {
        console.log(data);

        for (let i = 0; i < data.length; i++){
          const date = new date(data[i].dt_text.getDay();
          console.log(days[date]);
          if ( ((date === todaysNumberInWeek + 1) || (todaysNumberInWeek === 6 && date === 0)) && !this.day1Name){
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main);

          } else if ( !!this.day1Name && !this.day2Name && days[date] !== this.day1Name ){
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main);

          } else if ( !!this.day2Name && !this.day3Name && days[date] !== this.day2Name ){
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main);

          } else if ( !!this.day3Name && !this.day4Name && days[date] !== this.day3Name ){
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main);

          } else if ( !!this.day4Name && !this.day5Name && days[date] !== this.day4Name ){
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main);
          }
        }
      });
    });
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }

}
