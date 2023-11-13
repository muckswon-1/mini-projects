import React, { useEffect, useState } from "react";
import style from "./WeatherToday.module.css";
import {
  background,
  kelvinToCelsius,
  formatDate,
  formatTime,
  createDataObject,
} from "../utils/utils";

function WeatherToday({ weatherData }) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const data = createDataObject(weatherData);

  return (
    <div
      className={style.container}
      style={{ backgroundImage: `url(${background.rain})` }}
    >
      <div className={style.location_info}>
        <span className={style.day}>{formatDate(dateTime)}</span>
        <span className={style.time}>{formatTime(dateTime)}</span>

        {
          <>
            <span className={style.city}>{data.city}</span>
            <div className={style.country}>
              <span>{data.city}, </span>
              <span>{data.country}</span>
            </div>
          </>
        }
      </div>

      {
        <>
          <div className={style.weather_desc}>
            <span>{data.weather}</span>
          </div>
          <div className={style.temperature}>
            <span>{kelvinToCelsius(data.temperature)}</span>
            <span>Degrees Celcius</span>
          </div>
          <div className={style.other_info}>
            <span>Pressure : {data.pressure}%</span>
            <span>Humidity: {data.humidity}% </span>
            <span>Wind : {data.wind}km/h</span>
          </div>
        </>
      }
    </div>
  );
}

export default WeatherToday;
