import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class WeatherService {

  /*urltest is dummy url of testing purpose*/
  private urltest: string = '../assets/data.json';
  private url: string = 'https://api.openweathermap.org/data/2.5/weather'
  constructor (private http:HttpClient) { }
  private api_key = '6f4f0d90fc2993f6e1260d12da9b8b2a';

  getWeatherData(name):Observable<any>{
    let params = {
      q: name,
      appid: this.api_key
    }

    return this.http.get<any>(this.url, {params :params}).pipe(
    catchError(err => of({}))
    );
  }

  storeWeatherData(panelData):void{
    localStorage.setItem('weather', JSON.stringify(panelData));
  }
  storeCityData(city):void{
    localStorage.setItem('city', JSON.stringify(city));
  }
}