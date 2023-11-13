import React, { useEffect, useState } from "react";
import style from "./WeatherWeek.module.css";
import axios from "axios";
import { kelvinToCelsius } from "../utils/utils";

const WeatherIcon = ({ iconCode }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return <img src={iconUrl} alt="Weather Icon" />;
};

function Card({ forecast }) {
  const data = forecast[0];
  const weather = data.weather[0];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const day = new Date(data.dt_txt).getDay();

  const icon = <WeatherIcon iconCode={weather.icon} />;

  return (
    <div className={style.card}>
      <div className={style.day}>
        <span>
          {weekDays[day]} {icon}
        </span>
      </div>
      <div className={style.other_stats}>
        <span>
          Temp {kelvinToCelsius(data.main.temp)} <sup>o</sup>C
        </span>
        <span>Pressure {data.main.pressure}</span>
        <span>Wind {data.wind.speed} km/h</span>
      </div>
    </div>
  );
}

function WeatherWeek({ latitude, longitude }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const API_KEY = "28fe2330d3ea7b33536c68b33bf6274e";
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    axios
      .get(API_URL)
      .then((response) => {
        setForecastData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const groupForecastsByDay = () => {
    if (forecastData && forecastData.list) {
      const groupedForecasts = forecastData.list.reduce((result, item) => {
        const forecastDate = item.dt_txt.split(" ")[0];

        if (!result[forecastDate]) {
          result[forecastDate] = [];
        }

        result[forecastDate].push(item);

        return result;
      }, {});

      const groupForecastsArray = Object.values(groupedForecasts);

      return groupForecastsArray;
    }
  };

  const forecasts = groupForecastsByDay();

  return (
    <div className={style.container}>
      {forecasts ? (
        forecasts.map((forecast, index) => {
          // return
          return <Card forecast={forecast} key={index} />;
        })
      ) : (
        <p>Loading ..</p>
      )}
    </div>
  );
}

export default WeatherWeek;
