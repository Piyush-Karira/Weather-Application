import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";
import { Observable, Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "weather-dashboard",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if (localStorage.length) {
      this.panelData = JSON.parse(localStorage.getItem("weather") || "[]");
      this.city = JSON.parse(localStorage.getItem("city") || "[]");
      for (let id = 0; id < 9; id++) {
        if (this.panelData[id] != null) this.getWeatherData(id);
      }
    }
  }

  /*variables declaration*/
  edit: boolean[] = new Array(9).fill(false);
  weatherData: any;
  panelData: any = new Array(9);
  error: boolean[] = new Array(9).fill(false);
  activePanel: boolean[] = new Array(9).fill(false);
  ID = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  city: string[] = new Array(9).fill("");
  subscription: Subscription[] = new Array(9);

  getUrl(id) {
    return "url(" + this.panelData[id].img + ")";
  }

  getImageStyle(id) {
    let myStyles = {};
    if (this.panelData[id]) {
      myStyles = {
        "background-image":`url(${this.panelData[id].img})`,
        "background-position": "center",
        "background-repeat": "no-repeat"
      };
    }
    return myStyles;
  }

  changePanel(id) {
    this.activePanel.fill(false);
    this.error.fill(false);
    this.activePanel[id] = true;
  }

  onSubmit(id) {
    this.edit[id] = false;
    this.getWeatherData(id);
  }

  /*Weather Service is called from here */
  getWeatherData(id) {
    if (this.city[id] != "") {
      if (this.subscription[id] != undefined)
        this.subscription[id].unsubscribe();

      this.subscription[id] = timer(0, 30000).pipe(
          switchMap(() => this.weatherService.getWeatherData(this.city[id]))
          ).subscribe(data => {
          if (Object.keys(data).length) {
            this.error[id] = false;
            this.setWeatherData(data, id);
          } else {
            this.panelData[id] = undefined;
            this.error[id] = true;
            this.subscription[id].unsubscribe();
          }
        });
    }
  }

  setWeatherData(data, id) {
    this.weatherData = data;
    console.log(this.weatherData);
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
    this.weatherData.weatherCon = this.weatherData.weather[0].main;
    this.weatherData.img =`https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
    this.panelData[id] = this.weatherData;
    this.weatherService.storeWeatherData(this.panelData);
    this.weatherService.storeCityData(this.city);
  }
}
