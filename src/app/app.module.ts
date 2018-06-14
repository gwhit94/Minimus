import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { DetailsComponent } from './details/details.component';

import { UiService } from './ui.service';
import { WeatherService } from './weather.service';

const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'details/:city', component: DetailsComponent},
  {path: 'add', component: AddCardComponent},
  {path: 'weatherCard', component: WeatherCardComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    AddCardComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UiService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
