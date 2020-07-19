import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {WeatherComponent} from './weather-dashboard/weather.component';
import { HttpClientModule } from '@angular/common/http';
import {WeatherService} from './weather.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule],
  providers: [WeatherService],
  declarations: [ AppComponent , WeatherComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
