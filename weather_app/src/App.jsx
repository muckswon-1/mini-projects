import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import WeatherToday from "./components/WeatherToday";
import WeatherWeek from "./components/WeatherWeek";
import axios from "axios";


const GeolocationComponent = ({ onLocationChange }) => {
  const [error, setError] = useState(null);

  const successHandler = (position) => {
    const { latitude, longitude } = position.coords;
    onLocationChange({ latitude, longitude });
  };

  const errorHandler = (err) => {
    setError(err.message);
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler,options);
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return <div>{error && <p>Error : {error}</p>}</div>;
};

const WeatherComponent = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  const [lastFetchTimestamp, setLastFetchTimestamp] = useState(0);

  useEffect(() => {
    const API_KEY = "28fe2330d3ea7b33536c68b33bf6274e";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    const shouldFetch = Date.now() - lastFetchTimestamp > 60 * 60 * 1000;

    if (shouldFetch) {
      axios
        .get(URL)
        .then((response) => {
          setWeatherData(response.data);
          setLastFetchTimestamp(Date.now());
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [longitude, latitude, lastFetchTimestamp]);

  return (
    <>
      <WeatherToday weatherData={weatherData}></WeatherToday>
      <WeatherWeek latitude={latitude} longitude={longitude}></WeatherWeek>
    </>
  );
};

function App() {
  const [year] = useState(new Date().getFullYear());
  const [location, setLocation] = useState(null);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div>
      <Header></Header>
      <div className="main">
        <GeolocationComponent onLocationChange={handleLocationChange} />

        {location && <WeatherComponent {...location} />}
      </div>
      <div className="footer">
        <p>&copy;{year} Cyril Mukabwa</p>
      </div>
    </div>
  );
}

export default App;
