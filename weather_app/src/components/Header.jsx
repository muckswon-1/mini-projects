import React from "react";
import style from "./Header.module.css";

export default function Header() {
  return (
    <div className={style.header}>
      <h1>Smart Forecast</h1>
      <p>
        This is an application to share accurate weather data and government
        notifcations about weather
      </p>
    </div>
  );
}
